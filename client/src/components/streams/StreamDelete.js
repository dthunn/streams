import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import Modal from '../Modal';

const StreamDelete = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchStream, deleteStream } = useActions();
  const stream = useSelector((state) => state.streams[id]);

  useEffect(() => {
    fetchStream(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = () => {
    if (!stream) {
      return 'Are you sure you want to delete this stream?';
    } else {
      return `Are you sure you you want to delete stream ${stream.title}?`;
    }
  };

  const actions = (
    <div>
      <button onClick={() => deleteStream(id)} className='ui button negative'>
        Delete
      </button>
      <Link to='/' className='ui button'>
        Cancel
      </Link>
    </div>
  );

  return (
    <div>
      Stream Delete
      <Modal
        title='Delete Stream'
        content={renderContent()}
        actions={actions}
        onDismiss={() => navigate('/')}
      />
    </div>
  );
};

export default StreamDelete;
