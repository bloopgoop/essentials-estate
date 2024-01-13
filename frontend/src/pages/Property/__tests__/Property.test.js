// import { render, screen } from '@testing-library/react';
// import Property from '../Property';
// import { BrowserRouter } from 'react-router-dom';
// import AuthContext from 'context/AuthContext';

// // Mock context
// const mockAuthContext = {
//   user: { user_id: 1 },
//   authTokens: { access: 'access_token' },
// };

// describe('Property Component', () => {
//   test('renders Property component', () => {
//     render(
//       <AuthContext.Provider value={mockAuthContext}>
//         <BrowserRouter>
//           <Property />
//         </BrowserRouter>
//       </AuthContext.Provider>
//     );
//   });

//   test('renders Navbar component', () => {
//     render(
//       <AuthContext.Provider value={mockAuthContext}>
//         <BrowserRouter>
//           <Property />
//         </BrowserRouter>
//       </AuthContext.Provider>
//     );
//     const navbarElement = screen.getByRole('navigation');
//     expect(navbarElement).toBeInTheDocument();
//   });

//   // Add more tests as needed
// });

