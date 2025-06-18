import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const totalNumeros = 200;
  const [numerosSelecionados, setNumerosSelecionados] = useState([]);
  const [numerosVendidos, setNumerosVendidos] = useState([]);
  const [mostrarPagamento, setMostrarPagamento] = useState(false);

  const chavePix = '21982994628';

  const handleSelecionarNumero = (numero) => {
    if (numerosVendidos.includes(numero)) return; 
    if (numerosSelecionados.includes(numero)) return;

    setNumerosSelecionados([...numerosSelecionados, numero]);
  };

  const abrirPagamento = () => {
    if (numerosSelecionados.length === 0) {
      alert('Selecione pelo menos um número antes de finalizar.');
      return;
    }
    setMostrarPagamento(true);
  };

  const copiarPix = () => {
    navigator.clipboard.writeText(chavePix);
    alert('Chave Pix copiada!');
  };

  const fecharModal = () => {
    setNumerosVendidos([...numerosVendidos, ...numerosSelecionados]);
    setNumerosSelecionados([]);
    setMostrarPagamento(false);
  };

  return (
    <div className="App">
      <h1>🎊 Rifa de São João - Escolha seus Números 🎊</h1>

      <div className="grid">
        {[...Array(totalNumeros)].map((_, index) => {
          const numero = index + 1;
          const vendido = numerosVendidos.includes(numero);
          const selecionado = numerosSelecionados.includes(numero);

          return (
            <div
              key={numero}
              className={`numero-card 
                ${vendido ? 'vendido' : ''}
                ${selecionado ? 'selecionado' : ''}`}
              onClick={() => handleSelecionarNumero(numero)}
            >
              {numero}
            </div>
          );
        })}
      </div>

      {numerosSelecionados.length > 0 && (
        <button className="finalizar" onClick={abrirPagamento}>
          Finalizar e Pagar {numerosSelecionados.length > 1 ? `(${numerosSelecionados.length} números)` : ''}
        </button>
      )}

      {mostrarPagamento && (
        <div className="modal">
          <div className="modal-content">
            <h2>🎉 Quase lá!</h2>

            <div className="resumo-numeros">
              <p><strong>Números escolhidos:</strong></p>
              <div className="numeros-selecionados">
                {numerosSelecionados.map((num) => (
                  <span key={num} className="numero-item">{num}</span>
                ))}
              </div>
            </div>

            <p className="valor-total">
              <strong>Valor total:</strong> R${numerosSelecionados.length * 5},00
            </p>

            <div className="info-pix">
              <p>Realize o pagamento via Pix usando a chave abaixo:</p>
              <input type="text" value={chavePix} readOnly />
              <button onClick={copiarPix}>📋 Copiar chave Pix</button>
            </div>

            <div className="qr">
              <p><strong>Ou escaneie o QR Code:</strong></p>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Pix%20para%20${chavePix}%20-%20Valor:%20R$${numerosSelecionados.length * 5},00`}
                alt="QR Code Pix"
              />
            </div>

            <button className="fechar" onClick={fecharModal}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
