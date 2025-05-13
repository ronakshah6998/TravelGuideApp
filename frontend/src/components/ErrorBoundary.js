import React, { Component } from 'react';
import { Typography, Button, Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="50vh"
          p={3}
          textAlign="center"
        >
          <ErrorOutlineIcon color="error" style={{ fontSize: 60, marginBottom: 20 }} />
          <Typography variant="h5" gutterBottom>
            Oops! Something went wrong.
          </Typography>
          <Typography color="textSecondary" paragraph>
            We're sorry, but we've encountered an unexpected error. The error has been reported and we'll look into it.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleRetry}
            sx={{ mt: 2 }}
          >
            Try Again
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
