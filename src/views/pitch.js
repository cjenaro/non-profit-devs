//* @jsx jsx */
import { jsx, css } from "@emotion/core";
import Title from "../components/Title";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Pitch() {
  return (
    <section
      css={css`
        background-color: var(--lavender);
        color: var(--ember);
        padding-top: 50px;
        padding-bottom: 100px;
      `}
    >
      <div className="container">
        <Title color="var(--lavender)" borderColor="var(--ember)">
          New Project.
        </Title>
        <p>
          We are glad you decided to pitch your project to us, please fill in
          the form below
        </p>
        <form>
          <Input label="ong name:" name="ongName" id="ongName" />
          <Input label="contact email:" name="contactEmail" id="contactEmail" />
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
          ></textarea>
          <Button>Submit Pitch</Button>
        </form>
      </div>
    </section>
  );
}
