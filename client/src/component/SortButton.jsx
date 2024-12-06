function SortButton(props) {
  return (
    <div>
      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id={props.id}
        autoComplete="off"
        readOnly
        checked={props.sortCriterion === props.criterion}
        onClick={() => {
          props.sortChampions(props.criterion);
        }}
      />
      <label className="btn btn-outline-secondary" htmlFor={props.id}>
        {props.label}
        {props.sortCriterion === props.criterion &&
          (props.isDescending ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-up"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"
              />
            </svg>
          ))}
      </label>
    </div>
  );
}

export default SortButton;
