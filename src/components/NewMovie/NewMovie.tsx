import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newValue: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const [isVeryfied, setIsVeryfied] = useState({
    title: false,
    description: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const isAllVeryfied = isVeryfied.title
    && isVeryfied.description
    && isVeryfied.imgUrl
    && isVeryfied.imdbUrl
    && isVeryfied.imdbId;

  const setVeryfication = (field: string, value: boolean) => {
    setIsVeryfied(movieVer => ({
      ...movieVer,
      [field]: value,
    }));
  };

  const changeMovieField = (field: string, newValue: string) => {
    setNewMovie(movie => ({
      ...movie,
      [field]: newValue,
    }));
  };

  const customValidation = (value: string) => {
    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    const result = pattern.test(value);

    return result;
  };

  const reset = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handeSubmit = () => {
    if (isAllVeryfied) {
      setCount(oldValue => oldValue + 1);
      onAdd(newMovie);
      reset();
    }
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handeSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={changeMovieField}
        setVeryfication={setVeryfication}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={changeMovieField}
        setVeryfication={setVeryfication}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={changeMovieField}
        setVeryfication={setVeryfication}
        customValidation={customValidation}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={changeMovieField}
        setVeryfication={setVeryfication}
        customValidation={customValidation}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={changeMovieField}
        setVeryfication={setVeryfication}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isVeryfied}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
