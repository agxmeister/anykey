import ReactDOM from 'react-dom/client';

function App() {
    return <>
        <div>This is a test React application.</div>
    </>;
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}
