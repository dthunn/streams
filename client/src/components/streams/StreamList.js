import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';

const StreamList = () => {
  const { fetchStreams } = useActions();

  const streamsObj = useSelector((state) => state.streams);
  const currentUserid = useSelector((state) => state.auth.userId);
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    fetchStreams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setStreams(Object.values(streamsObj));
  }, [streamsObj]);

  const renderAdmin = (stream) => {
    if (stream.userId === currentUserid) {
      return (
        <div className='right floated content'>
          <Link to={`/streams/edit/${stream.id}`} className='ui button primary'>
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className='ui button negative'
          >
            Delete
          </Link>
        </div>
      );
    }
  };

  const renderList = () => {
    return streams.map((stream) => {
      return (
        <div className='item' key={stream.id}>
          {renderAdmin(stream)}
          <i className='large middle aligned icon camera' />
          <div className='content'>
            <Link to={`/stream/${stream.id}`} className='header'>
              {stream.title}
            </Link>
            <div className='description'>{stream.description}</div>
          </div>
        </div>
      );
    });
  };

  const renderCreate = () => {
    if (isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to='/streams/new' className='ui button primary'>
            Create Stream
          </Link>
        </div>
      );
    }
  };

  return (
    <div>
      <h2>Streams</h2>
      <div className='ui celled list'>{renderList()}</div>
      {renderCreate()}
    </div>
  );
};

export default StreamList;
