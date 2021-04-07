import Input from "./Input";
function Enter(props) {
  return (
    <div className="enter">
      <form className="enter__form">
        <h2 className="enter__title">{props.title}</h2>
        <Input className={"enter__input"}/>
        <Input className={"enter__input"}/>
        <button
          type="submit"
          className="enter__button">
          {props.buttonText}
        </button>
        {props.children}
      </form>
    </div>
  )
}

export default Enter;