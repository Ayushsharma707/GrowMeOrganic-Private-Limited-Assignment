import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';

interface Artwork {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: string;
  date_end: string;
  image_id: string;
}

const API_BASE_URL = 'https://api.artic.edu/api/v1/artworks';

const App: React.FC = () => {
  const [artworkList, setArtworks] = useState<Artwork[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [rows] = useState<number>(12);
  const [selectedArtworks, setSelectedArtworks] = useState<number[]>([]);
  const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
  const [selectedRowCount, setSelectedRowCount] = useState<number>(0);

  // Fetch data from the API and update the state with the result
  const fetchData = async (page: number, rowsPerPage: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}?page=${page}&limit=${rowsPerPage}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setArtworks(data.data);
      setTotalRecords(data.pagination.total);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Something went wrong while fetching the data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // This function gets triggered whenever the page is changed
  const onPageChange = (event: any) => {
    const newPage = event.page + 1; // PrimeReact uses 0-based page indexing.
    setPage(newPage);
    fetchData(newPage, rows);
  };

  // Function to select rows from multiple pages
  const selectRowsAcrossPages = async (rowCount: number) => {
    const selectedIds: number[] = [];
    let remainingToSelect = rowCount;
    let currentPage = 1;

    setLoading(true);

    try {
      while (remainingToSelect > 0) {
        const response = await fetch(`${API_BASE_URL}?page=${currentPage}&limit=${rows}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (!data.data || data.data.length === 0) break;

        const rowsToSelect = Math.min(remainingToSelect, data.data.length);
        selectedIds.push(...data.data.slice(0, rowsToSelect).map((item: Artwork) => item.id));
        remainingToSelect -= rowsToSelect;
        currentPage++;
      }

      // Update the selected artwork state with the newly selected items
      setSelectedArtworks(selectedIds);
    } catch (error) {
      console.error('Error during row selection:', error);
      alert('There was an issue selecting the rows. Please try again.');
    } finally {
      setLoading(false);
      setVisibleDialog(false); // Close the dialog once selection is done
    }
  };

  // Handle the double-click event to select a single row
  const handleRowDoubleClick = (artwork: Artwork) => {
    setSelectedArtworks([artwork.id]); // Clear any previous selections and select the clicked item
  };

  const handleRowSelection = (selectedIds: number[], currentPageIds: number[]) => {
    const otherSelections = selectedArtworks.filter((id) => !currentPageIds.includes(id));
    return [...otherSelections, ...selectedIds];
  };

  // Clear all selected rows
  const clearAllSelections = () => {
    setSelectedArtworks([]);
  };

  // Fetch data when the component mounts or when page changes
  useEffect(() => {
    fetchData(page, rows);
  }, [page, rows]);

  return (
    <div className="container">
      <h1 className="header">PrimeReact DataTable with Server-Side Pagination</h1>

      <div className="selection-info">
        <h3>Total Selected: {selectedArtworks.length}</h3>

        {selectedArtworks.length > 0 && (
          <Button
            icon="pi pi-times"
            label="Clear Selection"
            className="p-button-danger p-button-outlined"
            onClick={clearAllSelections}
            tooltip="Clear all selected rows"
            tooltipOptions={{ position: 'bottom' }}
          />
        )}
      </div>

      <DataTable
        value={artworkList}
        paginator
        rows={rows}
        totalRecords={totalRecords}
        loading={loading}
        onPage={onPageChange}
        selection={artworkList.filter((art) => selectedArtworks.includes(art.id))}
        onSelectionChange={(e) => {
          const selectedIds = e.value.map((artwork: Artwork) => artwork.id);
          const currentPageIds = artworkList.map((artwork: Artwork) => artwork.id);
          setSelectedArtworks(handleRowSelection(selectedIds, currentPageIds));
        }}
        selectionMode="multiple"
        dataKey="id"
        responsiveLayout="scroll"
        lazy
        first={(page - 1) * rows}
        onRowDoubleClick={(e) => handleRowDoubleClick(e.data)}
        className="data-table"
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3em' }} />
        <Column
          header={
            <div className="header-content">
              <Button
                icon="pi pi-chevron-down"
                className="p-button-text"
                onClick={() => setVisibleDialog(true)}
              />
            </div>
          }
          bodyStyle={{ textAlign: 'center' }}
          headerStyle={{ width: '3em' }}
        />
        <Column field="id" header="ID" />
        <Column field="title" header="Title" />
        <Column field="place_of_origin" header="Place of Origin" />
        <Column field="artist_display" header="Artist" />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="date_start" header="Start Date" />
        <Column field="date_end" header="End Date" />
        <Column
          header="Image"
          body={(rowData: Artwork) => (
            <img
              src={`https://www.artic.edu/iiif/2/${rowData.image_id}/full/200,/0/default.jpg`}
              alt={rowData.title}
              className="artwork-image"
            />
          )}
        />
      </DataTable>

      <Dialog
        header="Select Rows Across Pages"
        visible={visibleDialog}
        onHide={() => setVisibleDialog(false)}
        className="dialog-box"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            selectRowsAcrossPages(selectedRowCount);
          }}
          className="dialog-content"
        >
          <h4>Enter number of rows to select:</h4>
          <InputNumber
            value={selectedRowCount}
            onValueChange={(e) => setSelectedRowCount(e.value || 0)}
            min={1}
            max={totalRecords}
            showButtons
            autoFocus
            placeholder="Enter number of rows"
            aria-label="Row count input"
            className="row-count-input"
          />
          <div className="dialog-footer">
            <Button
              label="Cancel"
              icon="pi pi-times"
              onClick={() => setVisibleDialog(false)}
              type="button"
            />
            <Button label="Submit" icon="pi pi-check" type="submit" />
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default App;
