import { Provider } from 'react-redux';
import './App.css';
import { RoutesList } from './RoutesList';
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
	return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<RoutesList />
				</PersistGate>
			</Provider>
	);
}

export default App;




