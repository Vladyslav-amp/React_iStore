import { Header } from '../Header/Header';
import './Main.scss';


export const Main = () => {
  return (
    <div className="main">
      <div className="main-container">
        <div className="main-header">
          <Header />
        </div>
        <div className="main-body">
        </div>
      </div>
    </div>
  );
}