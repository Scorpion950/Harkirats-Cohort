import React, {useState, useEffect } from 'react';

function App() {
    const items = [ // id == keys
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
    ];

    return (
        <div>
            <Card>
                <h2>Card Title</h2>
                <p>This is some content inside the card.</p>
            </Card>

            <Card>
                <h2>Another Card</h2>
                <p>This card has different content!</p>
            </Card>

            <ItemList items={items}></ItemList>

          <div>

            <ErrorBoundary>
          <Card1></Card1>
          </ErrorBoundary>
          
            <ErrorBoundary>
          <Card2></Card2>
          </ErrorBoundary>
        </div>

        </div>

        

    );
}

function Card({ children }) { //Children function
    return (
        <div
            style={{ // inline styling
                backgroundColor: 'blue',
                color: 'white',
            }}
        >
            {children}
        </div>
    );
}

function ItemList({ items }) { //Lists and Keys
    return (
        <ul>
            {items.map((item) => ( //Lists
                <li key={item.id}>{item.name}</li> //Keys
            ))}
        </ul>
    );
}

function Card1() { 

  throw new Error("error while rendering")
    return (
        <div
            style={{ 
                backgroundColor: 'blue',
                borderRadius :20,
                padding:20,
                color: 'white',
            }}
        >
            Hello There !!
        </div>
    );
}

function Card2() {
    return (
        <div
            style={{
                backgroundColor: 'red',
                borderRadius:20,
                padding:20,
                margin: 20,
                color: 'white',
            }}
        > 
        Hey There !!
        </div>
    );
}

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("Error caught:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children; 
    }
}

export default App;