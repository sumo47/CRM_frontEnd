import React from 'react';

const Header = () => {
    return (
        <header>
            <h1>CRM Dashboard</h1>
            <nav>
                <a href="/customers">Customers</a>
                <a href="/leads">Leads</a>
                <a href="/pipelines">Pipelines</a>
                <a href="/tasks">Tasks</a>
            </nav>
        </header>
    );
};

export default Header;
