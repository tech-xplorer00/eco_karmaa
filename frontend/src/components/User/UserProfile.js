import React, { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { useAuth } from '../../contexts/AuthContext';
import './User.css';

const UserProfile = () => {
  const { userProfile, userStats, loading, error, updateProfile, updatePassword } = useUser();
  const { logout } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: ''
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [passwordError, setPasswordError] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState('');

  // Set initial form data when user profile is loaded
  React.useEffect(() => {
    if (userProfile) {
      setProfileData({
        name: userProfile.name || '',
        email: userProfile.email || '',
        bio: userProfile.bio || ''
      });
    }
  }, [userProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setProfileData({
      name: userProfile.name || '',
      email: userProfile.email || '',
      bio: userProfile.bio || ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profileData);
      setIsEditing(false);
      setUpdateSuccess('Profile updated successfully!');
      setTimeout(() => setUpdateSuccess(''), 3000);
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };
  
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    try {
      await updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setShowPasswordForm(false);
      setUpdateSuccess('Password updated successfully!');
      setTimeout(() => setUpdateSuccess(''), 3000);
    } catch (err) {
      setPasswordError(err.response?.data?.error || 'Failed to update password');
      console.error('Error updating password:', err);
    }
  };
  
  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Your Profile</h2>
        <div className="profile-actions">
          {!isEditing ? (
            <>
              <button className="btn btn-primary" onClick={handleEdit}>
                Edit Profile
              </button>
              <button className="btn btn-outline" onClick={() => setShowPasswordForm(!showPasswordForm)}>
                Change Password
              </button>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button className="btn btn-outline" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {updateSuccess && <div className="alert alert-success">{updateSuccess}</div>}

      <div className="profile-content">
        <div className="profile-info">
          {!isEditing ? (
            <div className="profile-details">
              <div className="detail-group">
                <h3>Name</h3>
                <p>{userProfile?.name}</p>
              </div>
              <div className="detail-group">
                <h3>Email</h3>
                <p>{userProfile?.email}</p>
              </div>
              <div className="detail-group">
                <h3>Bio</h3>
                <p>{userProfile?.bio || 'No bio yet.'}</p>
              </div>
            </div>
          ) : (
            <form className="profile-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text"
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </form>
          )}
        </div>

        <div className="profile-stats">
          <h3>Your Stats</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-value">{userStats?.points || 0}</span>
              <span className="stat-label">Points</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{userStats?.level || 1}</span>
              <span className="stat-label">Level</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{userStats?.challengesCompleted || 0}</span>
              <span className="stat-label">Challenges Completed</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{userStats?.badgesEarned || 0}</span>
              <span className="stat-label">Badges Earned</span>
            </div>
          </div>
        </div>
      </div>

      {showPasswordForm && (
        <div className="password-form-container">
          <h3>Change Password</h3>
          
          {passwordError && <div className="alert alert-error">{passwordError}</div>}
          
          <form className="password-form" onSubmit={handlePasswordSubmit}>
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input 
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input 
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
                minLength={6}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input 
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
                minLength={6}
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Update Password
              </button>
              <button 
                type="button" 
                className="btn btn-outline"
                onClick={() => setShowPasswordForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserProfile; 