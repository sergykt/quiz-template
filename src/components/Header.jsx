const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <ul className="navbar__list">
            <li>
              <a href="/" className="navbar__link">
                <img className="logo" src="/img/quiz-logo.png" alt="logo" />
              </a>
            </li>
            <li>
              <a href="/quiz" className="navbar__link">Квиз</a>
            </li>
            <li>
              <a href="/edit" className="navbar__link">Редактор вопросов</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

