import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 


interface NewOperationFormProps {
  calculationId: string;
  showNewCalculationAlert: boolean;
  onSuccess: () => void;
  onError: (error: string) => void;
  onCancel: () => void;
}

interface NewOperationFormRef {
  focus: () => void;
}

const NewOperationForm = forwardRef<NewOperationFormRef, NewOperationFormProps>(({ calculationId, showNewCalculationAlert, onSuccess, onError, onCancel }, ref) => {
  const [operationType, setOperationType] = useState<string>('addition');
  const [operationValue, setOperationValue] = useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();


  useImperativeHandle(ref, () => ({
    focus: () => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `https://calculationtreebackend-i779g6cp7-harsh-tyagis-projects-3fabd221.vercel.app/api/calculations/${calculationId}/operations`,
        {
          type: operationType,
          value: parseInt(operationValue)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if(response.status === 201 || response.status === 200){
        if(showNewCalculationAlert){
          alert('This will create a new calculation');
        }
        onSuccess();
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

  return (
    <form ref={formRef} onSubmit={handleSubmit} className='my-4'>
      <div className="form-group">
        <h5>Performing operation on Id - {calculationId}</h5>
        <label htmlFor="operationType">Operation Type:</label>
        <select
          className="form-control"
          id="operationType"
          value={operationType}
          onChange={(e) => setOperationType(e.target.value)}
          required
        >
          <option value="addition">Addition</option>
          <option value="subtraction">Subtraction</option>
          <option value="multiplication">Multiplication</option>
          <option value="division">Division</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="operationValue">Operation Value:</label>
        <input
          type="number"
          className="form-control"
          id="operationValue"
          value={operationValue}
          onChange={(e) => setOperationValue(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary my-2 me-2">Submit</button>
      <button type="button" className="btn btn-secondary my-2" onClick={onCancel}>Cancel</button> {/* Added onClick handler for cancel button */}
    </form>
  );
});

export default NewOperationForm;
