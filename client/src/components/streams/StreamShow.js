import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';

const StreamShow = () => {
  const { id } = useParams();
  const stream = useSelector((state) => state.streams[id]);
  const { fetchStream } = useActions();

  useEffect(() => {
    fetchStream(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {!stream && <div>Loading...</div>}
      {stream && (
        <div>
          <h1>{stream.title}</h1>
          <h5>{stream.description}</h5>
        </div>
      )}
    </div>
  );
};

export default StreamShow;
