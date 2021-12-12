import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import api from './services/api';

import './styles.css';

const App = () => {

	const [cep, setCep] = useState('');
	const [data, setData] = useState({});

	const handleSeach = async () => {

		if (!cep.trim()) return alert('Informe Algum Cep');

		try {

			const response = await api.get(`${cep}/json`);

			setData(response.data)
			setCep('');

		} catch {
			setCep('');
			setData({});
			alert('Erro ao encontrar CEP');
		}

	}

	return (
		<div className="container">
			<h1 className="title">Buscar CEP</h1>

			<div className="containerInput">
				<input
					type="text"
					placeholder="Informe um CEP"
					value={cep}
					onChange={e => setCep(e.target.value)}
				/>

				<button className="buttonSearch" onClick={handleSeach}>
					<FiSearch size={25} color="#fff" />
				</button>
			</div>

			{Object.keys(data).length > 0 && (

				<main className="main">
					<h2>CEP: {data.cep}</h2>

					<span>{data.logradouro}</span>
					<span>DDD: {data.ddd}</span>
					<span>{data.bairro}</span>
					<span>{data.localidade} - {data.uf}</span>
				</main>

			)}

		</div>
	)
}

export default App
