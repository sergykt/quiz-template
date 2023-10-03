import Button from "./Button";

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);

  return `${day}.${month}.${year}`;
};

const Stats = ({ results, isCompleted }) => {
  const maxPoints = 20;
  const totalPoints = results.reduce((acc, item) => (acc + item.points), 0);

  if (!isCompleted) {
    return null;
  }

  if (results.length === 0) {
    return (
      <>
        <p className="profile__warn">Пройдите тест, так как статистика пока недоступна</p>
        <a href="/quiz"><Button>Начать квиз</Button></a>
      </>
    );
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Дата</th>
          <th>Правильных ответов</th>
          <th>Неправильных ответов</th>
          <th>% правильных ответов</th>
        </tr>
      </thead>
      <tbody>
        {results.map(({ id, points, date }, index) => {
          const dateObject = new Date(date);
          const formattedDate = formatDate(dateObject);

          return (
            <tr key={id}>
              <td>{index + 1}</td>
              <td>{formattedDate}</td>
              <td>{points}</td>
              <td>{maxPoints - points}</td>
              <td>{(points / maxPoints * 100).toFixed(1)}%</td>
            </tr>
          );
        })}
        {<tr>
          <th colSpan="2">Общий результат</th>
          <td>{totalPoints}</td>
          <td>{maxPoints * results.length - totalPoints}</td>
          <td>{((totalPoints) / (maxPoints * results.length) * 100 || 0).toFixed(1)}%</td>
        </tr>}
      </tbody>
    </table>
  );
};

export default Stats;
