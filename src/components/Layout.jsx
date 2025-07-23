import { Link, Outlet } from 'react-router-dom';
import './Layout.css'


//page structure!!
const Layout = () => {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>Pokemon Dashboard</h2>
        <nav>
          <Link to="/">Dashboard</Link>
          {/* Add more nav links here if needed */}
        </nav>
      </aside>

      <main className="main-content">
        <header>
          <h1 className='header-bar'>Pokémon Dashboard</h1>
        </header>

        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
