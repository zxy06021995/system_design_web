import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { QuestionPage } from './pages/QuestionPage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/question/:id" element={<QuestionPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
