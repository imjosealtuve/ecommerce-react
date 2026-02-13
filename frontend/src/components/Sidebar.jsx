import { Link, useLocation } from 'react-router-dom';
import { Home, Sprout, Dog, Smartphone, Monitor, ChefHat, Cpu, Bike } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar() {
    const location = useLocation();
    const menuItems = [
        { name: 'Home', icon: Home, path: '/' },
        { name: 'Gardening', icon: Sprout, path: '/category/gardening' },
        { name: 'Pets', icon: Dog, path: '/category/pets' },
        { name: 'Phones', icon: Smartphone, path: '/category/phones' },
        { name: 'PC', icon: Monitor, path: '/category/pc' },
        { name: 'Kitchen', icon: ChefHat, path: '/category/kitchen' },
        { name: 'Technology', icon: Cpu, path: '/category/technology' },
        { name: 'Lifestyle', icon: Bike, path: '/category/lifestyle' },
    ];

    return (
        <aside className="sidebar">
            {menuItems.map((item) => {
                const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                return (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`sidebar-link ${isActive ? 'active' : ''}`}
                    >
                        <item.icon size={14} color={'var(--blue)'} />
                        <span>{item.name}</span>
                    </Link>
                );
            })}
        </aside>
    );
}
