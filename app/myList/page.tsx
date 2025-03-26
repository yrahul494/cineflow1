"use client";

import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Box, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface WatchListItem {
  poster: string;
  title: string;
  id: string | number;
  type?: 'movie' | 'tv';
  // Add other unique identifiers as needed
}

export default function MyListPage() {
  const [watchList, setWatchList] = useState<WatchListItem[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<WatchListItem | null>(null);

  useEffect(() => {
    // Retrieve watchlist from localStorage when component mounts
    const savedWatchList = JSON.parse(localStorage.getItem('myLists') || '[]');
    setWatchList(savedWatchList);
  }, []);

  const handleRemoveConfirmation = (item: WatchListItem) => {
    setItemToRemove(item);
    setOpenDialog(true);
  };

  const handleRemoveFromList = () => {
    if (!itemToRemove) return;

    // Remove only the specific item by matching both id and title
    const updatedWatchList = watchList.filter(
      (item) => !(item.id === itemToRemove.id && item.title === itemToRemove.title)
    );
    
    // Update state
    setWatchList(updatedWatchList);
    
    // Update localStorage
    localStorage.setItem('myLists', JSON.stringify(updatedWatchList));
    
    // Close dialog
    setOpenDialog(false);
    setItemToRemove(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setItemToRemove(null);
  };

  if (watchList.length === 0) {
    return (
      <Container 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '100vh',
          bgcolor: 'black',
          color: 'white',
          textAlign: 'center',
          p: 10
        }}
      >
        <Typography variant="h4" gutterBottom>
          Your Watchlist is Empty
        </Typography>
        <Typography variant="body1">
          Add movies and TV shows to your watchlist to see them here.
        </Typography>
      </Container>
    );
  }

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        bgcolor: 'black', 
        color: 'white', 
        py: 4
      }}
    >
      <Container>
        <Typography variant="h6" gutterBottom sx={{ mb: 4, lineHeight: 3 }}>
          My Watchlist
        </Typography>
        <Grid container spacing={3}>
          {watchList.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={`${item.id}-${item.title}`}>
              <Card 
                sx={{ 
                  bgcolor: 'grey.900', 
                  color: 'white', 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={item.poster}
                  alt={item.title}
                  sx={{ 
                    objectFit: 'cover', 
                    height: 300 
                  }}
                />
                <CardContent 
                  sx={{ 
                    flexGrow: 1, 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                  }}
                >
                  <Typography  component="div">
                    {item.title}
                  </Typography>
                  <Button 
                    color="error" 
                    startIcon={<DeleteIcon />}
                    onClick={() => handleRemoveConfirmation(item)}
                  >
                    Remove
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Confirmation Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            '& .MuiPaper-root': {
              bgcolor: 'grey.900',
              color: 'white'
            }
          }}
        >
          <DialogTitle id="alert-dialog-title">
            Remove from Watchlist
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" color="white">
              Are you sure you want to remove {itemToRemove?.title} from your watchlist?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button 
              onClick={handleRemoveFromList} 
              color="error" 
              autoFocus
            >
              Remove
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}