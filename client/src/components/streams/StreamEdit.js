import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StreamForm from './StreamForm';
import { useActions } from '../../hooks/useActions';

const StreamEdit = () => {
  const { id } = useParams();
  const { editStream, fetchStreams } = useActions();
  const stream = useSelector((state) => state.streams[id]);

  useEffect(() => {
    fetchStreams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (formValues) => {
    editStream(id, formValues);
  };

  return (
    <div>
      {!stream && <div>Loading...</div>}
      {stream && (
        <div>
          <h3>Edit a stream</h3>
          <StreamForm
            onSubmit={onSubmit}
            initialValues={{
              title: stream.title,
              description: stream.description,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default StreamEdit;
