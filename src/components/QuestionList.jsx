const renderQuestionsList = (questions) => (
  <ol className="questions-list">
    {questions.map((item) => {
      const { text, id } = item;
      return (
        <li className="questions-list__item" key={id}>
          <div className="questions-list__item-container">
            <p className="questions-list__item-title">{text}</p>
            <button className="questions-list__item-button button">
              Редактировать
            </button>
            <button className="questions-list__item-button button">
              Удалить
            </button>
          </div>
        </li>
      );
    })}
  </ol>
);

const QuestionList = ({ questions, setManagerMenu }) => {
  return (
    <div className="container">
      <button className="button questions-list__add-button" onClick={() => setManagerMenu('adding')}>
        Добавить
      </button>
      {renderQuestionsList(questions)}
    </div>
  );
};

export default QuestionList;
