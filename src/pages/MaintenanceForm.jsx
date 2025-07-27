// ... (other imports and state declarations)

function MaintenanceForm() {
  const { currentUser } = useAuth(); // Get currentUser from AuthContext

  // ... (other state variables)

  const fetchRequests = async () => {
    // IMPORTANT: Only proceed if currentUser and its ID are available
    if (!currentUser || !currentUser.id) {
      console.warn('Cannot fetch requests: currentUser or currentUser.id is not available yet.');
      setRequests([]); // Clear requests if no valid user
      return;
    }

    try {
      // Fetch all maintenance requests from the backend
      // Use the specific tenant ID in the API call if your backend supports it
      // Based on your server.js, you have: app.get('/api/maintenance/tenant/:tenant_id'
      const res = await axios.get(`http://localhost:4000/api/maintenance/tenant/${currentUser.id}`);
      // No need to filter here if the backend endpoint already filters by tenant_id
      setRequests(res.data); // Update state with requests fetched for this tenant
    } catch (error) {
      console.error('Error fetching requests:', error);
      setFormMessage({ type: 'danger', text: 'Error loading your requests.' });
    }
  };

  // useEffect hook to fetch requests when the component mounts or currentUser.id changes
  // This ensures the list is updated correctly for the logged-in tenant
  useEffect(() => {
    // Only call fetchRequests if currentUser.id is defined
    if (currentUser?.id) { // <--- CRITICAL CHANGE HERE: Conditional call
        fetchRequests();
    }
  }, [currentUser?.id]); // Dependency array: re-run if currentUser.id changes

  // ... (rest of the component)
}