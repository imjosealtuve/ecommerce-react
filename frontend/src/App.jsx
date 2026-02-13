import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductPage from './components/ProductPage';
import CategoryPage from './components/CategoryPage';
import Cart from './components/Cart';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <CartProvider>
      <div className="app-container">
        <Header />

        <Routes>
          <Route path="/" element={
            <>
              <div className="content-wrapper">
                <Sidebar />
                <main className="main-content">
                  <div className="banner-container">
                    <div className="banner-text">
                    </div>
                  </div>
                </main>
              </div>

              <div className="products-container">
                <h1 className="section-title">
                  Top picks for you
                </h1>
                <ProductList />
              </div>
            </>
          } />

          <Route path="/category/:category" element={
            <div className="content-wrapper" style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
              <Sidebar />
              <main className="main-content" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <CategoryPage />
              </main>
            </div>
          } />

          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>

        <Cart />
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
