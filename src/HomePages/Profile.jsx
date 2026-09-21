import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';


const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('signinData') || 'null');
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });
  const [status, setStatus] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('signinData');
    localStorage.removeItem('signupData');
    navigate('/');
  };

  if (!user) {
    return <main className="profilePage"><p>Please sign in to view your profile.</p></main>;
  }

  const handlePasswordChange = async event => {
    event.preventDefault();
    setStatus('');

    try {
      const response = await fetch('http://localhost:5000/ChangePassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, ...passwords })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to change password');

      setPasswords({ currentPassword: '', newPassword: '' });
      setStatus(data.message);
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <div>
        <main className="profilePage">
            <section className="profileDetails">
                <div className='box'>
                    <h2>Account Overview</h2>
                    <hr style={{ height:  '4px', background: 'black'}} />
                    <h3>Accout details</h3>
                    <p>{user.firstName} {user.lastName}</p>
                    <p>{user.email}</p>
                </div>

                <div className='box'>
                    <h2>Default address</h2>
                    <hr style={{ height:  '4px', background: 'black'}} />
                    <p>{user.homeAddress}, {user.town}, {user.state}, {user.country}</p>
                    <p>{user.contact}</p>
                </div>
            </section>

            <section className="changePassword">
                <h2>Change password</h2>
                <form onSubmit={handlePasswordChange}>
                    <div className='colomn'>
                        <div>
                            <label htmlFor="">Current Password</label><br />
                            <input type="password" placeholder="Current password" value={passwords.currentPassword} onChange={event => setPasswords({ ...passwords, currentPassword: event.target.value })} required />
                        </div>

                        <div>
                            <label htmlFor="">New Password</label><br />
                            <input type="password" placeholder="New password" value={passwords.newPassword} onChange={event => setPasswords({ ...passwords, newPassword: event.target.value })} minLength="6" required />
                        </div>
                    </div>
                <button type="submit">Save</button>
                </form>
                {status && <p role="status">{status}</p>}
            </section>

              <section className="profileLogout">
                <div>
                  <h2>Sign out</h2>
                  <p>End your current session on this device.</p>
                </div>
                <button type="button" onClick={handleLogout}>Log out</button>
              </section>
        </main>

        <Footer />
    </div>
  )
}

export default Profile
