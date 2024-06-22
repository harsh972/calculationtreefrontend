import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import NewOperationForm from './NewOperationForm'; // Import NewOperationForm component
import { Calculation } from '../types/types'; // Adjust path and types as necessary
import { useNavigate } from 'react-router-dom'; 

const MainComponent: React.FC = () => {
  const [data, setData] = useState<Calculation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null | any>(null);
  const [showOperation, setShowOperation] = useState<boolean>(false);
  const [newStartingNumber, setNewStartingNumber] = useState<string>('');
  const [addingNewCalculation, setAddingNewCalculation] = useState<boolean>(false);
  const [showNewCalculationAlert, setShowNowCalculationAlert] = useState<boolean>(false);
  const formRef = useRef<{ focus: () => void }>(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Calculation[]>('https://calculationtreebackend-i779g6cp7-harsh-tyagis-projects-3fabd221.vercel.app/api/calculations');
      setData(response.data);
    } catch (error) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleIdClick = (id: string, showAlertFlag: boolean) => {
    setSelectedId(id);
    setShowOperation(true);
    setAddingNewCalculation(false);
    setShowNowCalculationAlert(showAlertFlag);
    setTimeout(() => {
      formRef.current?.focus();
    }, 100);
  };

  const handleBackClick = () => {
    setSelectedId(null);
    fetchData(); // Refresh data after returning from DetailsComponent
  };

  const handleAddNewClick = () => {
    setAddingNewCalculation(true);
  };

  const handleCancelAdd = () => {
    setAddingNewCalculation(false);
    setNewStartingNumber('');
  };

  const handleNewOperationSuccess = () => {
    fetchData(); // Refresh data immediately after adding new operation
    setShowOperation(false);
  };

  const handleNewOperationError = (error: string) => {
    setError(error);
  };

  const handleCancelOperation = () => {
    setShowOperation(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://calculationtreebackend-i779g6cp7-harsh-tyagis-projects-3fabd221.vercel.app/api/calculations', {
        startingNumber: parseInt(newStartingNumber)
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if(response.status === 201 || response.status === 200){
        const newCalculation = response.data;
        setData([...data, newCalculation]);
        setAddingNewCalculation(false);
        setNewStartingNumber('');
        fetchData(); // Refresh data immediately after adding new calculation
      }
      else{
        alert("Please log in. Your session may have expired, or you might not be logged in.")
        navigate('/login');
      }
    } catch (error) {
      alert("Please log in. Your session may have expired, or you might not be logged in.")
      navigate('/login');
    }
  };

  if (loading) {
    return <div className="container mt-4"><p>Loading...</p></div>;
  }

  if (error) {
    return <div className="container mt-4"><p>{error}</p></div>;
  }

  const outerUlStyle = {
    boxShadow: '-2px 8px 15px 3px #1414141F',
    padding: '25px',
    listStyleType: 'none'
  };

  const buttonStyle = {
    padding: '0',
    background: 'transparent',
    color: '#3e80ce',
    textDecoration: 'none',
    borderColor: 'white',
    fontWeight: '600'
  };

  return (
    <div className="container mt-4">
      <h3>Add Calculation</h3>
      <button className="btn btn-primary mb-3" onClick={handleAddNewClick}>Add New Calculation</button>

      {addingNewCalculation && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="startingNumber">Enter Starting Number:</label>
            <input
              type="number"
              className="form-control"
              id="startingNumber"
              value={newStartingNumber}
              onChange={(e) => setNewStartingNumber(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary me-2 my-2">Submit</button>
          <button type="button" className="btn btn-secondary my-2" onClick={handleCancelAdd}>Cancel</button>
        </form>
      )}

      {showOperation && (
        <NewOperationForm
          ref={formRef}
          calculationId={selectedId}
          showNewCalculationAlert={showNewCalculationAlert}
          onSuccess={handleNewOperationSuccess}
          onError={handleNewOperationError}
          onCancel={handleCancelOperation} // Pass the cancel handler to NewOperationForm
        />
      )}

      <h3 className='my-3'>Calculations List (Latest on top):</h3>
      <ul>
        {data.map(item => (
          <li key={item._id} className='mb-5' style={outerUlStyle}>
            <strong>Calculation Id:</strong> {item._id},&emsp;
            <strong>Starting Number:</strong> {item.startingNumber},&emsp;
            <strong>Current Value:</strong> {item.currentValue},&emsp;
            <strong>Add New Operation:</strong>  <button className="btn btn-primary" onClick={() => handleIdClick(item._id, false)} style={buttonStyle}>Add Operation</button>
            <h5 className='my-2'>Operations - </h5>
            <ul>
              {item.operations.map(op => (
                <li key={op._id} className='my-2'>
                  <strong>Operation Id:</strong> {op._id},&ensp;
                  <strong>Type:</strong> {op.type},&ensp;
                  <strong>Operand Value:</strong> {op.value},&ensp;
                  <strong>Add New Operation:</strong>  <button className="btn btn-primary" onClick={() => handleIdClick(op._id, true)} style={buttonStyle}>Add Operation</button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainComponent;
