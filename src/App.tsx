// import './App.css';
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import CalculationTree from './components/CalculationTree';
// // import CalculationDetails from './components/CalculationDetails';
// import Login from './components/Login';
// import PostOperation from './components/PostOperations';
// import StartingNumber from './components/StartingNumber';

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<CalculationTree />} />
//         {/* <Route path="/calculation/:id" element={<CalculationDetails />} /> */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/post" element={<PostOperation />} />
//         <Route path="/start" element={<StartingNumber />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
// App.tsx

// App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/CalculationTree';
import Register from './components/register';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/" element={<Navigate to="/login" />} /> */}
      </Routes>
    </Router>
  );
};

export default App;


