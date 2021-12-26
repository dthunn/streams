import StreamForm from './StreamForm';
import { useActions } from '../../hooks/useActions';

const StreamCreate = () => {
  const { createStream } = useActions();

  const onSubmit = async (formValues) => {
    createStream(formValues);
  };

  return (
    <div>
      <h3>Create a Stream</h3>
      <StreamForm onSubmit={onSubmit} />
    </div>
  );
};

export default StreamCreate;
