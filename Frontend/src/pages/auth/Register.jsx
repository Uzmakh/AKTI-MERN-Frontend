import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from 'react-phone-number-input/input';
import 'react-phone-number-input/style.css';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Creatable from 'react-select/creatable';


const Register = () => {
    const navigate = useNavigate()
    // protected routing
    useEffect(() => {
        // Check if the authtoken is present in the local storage
        const authToken = localStorage.getItem('authtoken');
        if (authToken) {
            // Redirect to the home page if the user is already logged in
            navigate('/');
        }
    }, [navigate]);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [dob, setDob] = useState(null); // dob
    const [selectedCountry, setSelectedCountry] = useState(); // country
    const [phoneNumber, setPhoneNumber] = useState(); // phone
    const [selectedGender, setSelectedGender] = useState(''); // gender states
    const [selectedInterests, setSelectedInterests] = useState([]); // checkboxes
    const [selectedHobbies, setSelectedHobbies] = useState([]); // react select - hobbies
    const [selectedSkills, setSelectedSkills] = useState([]); // skills
    const [experience, setExperience] = useState(0); // experience
    const [experienceInput, setExperienceInput] = useState(0);
    const [selectedBorderColor, setSelectedBorderColor] = useState('#000000');
    const [profileImage, setProfileImage] = useState(null);

    // list of hobbies  
    const hobbiesOptions = [
        { label: 'Cricket', value: 'cricket' },
        { label: 'Chess', value: 'chess' },
        { label: 'Football', value: 'football' },
    ];

    // skills lists
    const skillsOptions = [
        { label: 'JavaScript', value: 'javascript' },
        { label: 'React', value: 'react' },
        { label: 'Node.js', value: 'nodejs' },
        // Add more predefined skills as needed
    ];

    // handle first name
    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value)

    }
    // handle last name
    const handleLastNameChange = (e) => {
        setLastName(e.target.value)

    }
    // email change
    const handleEmailChange = (e) => {
        setEmail(e.target.value);

    };
    // password change
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);

    };
    // confirm password change
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);

    };
    // dob
    const handleDateChange = (date) => {
        setDob(date);

    };
    // country
    const handleCountryChange = (country) => {
        setSelectedCountry(country);

    };
    // phone
    const handlePhoneChange = (value) => {
        setPhoneNumber(value);

    };
    // gender
    const handleGenderChange = (e) => {
        setSelectedGender(e.target.value);

    };
    // interests checkboxes
    // Event handler for capturing the selected interests as an array
    const handleInterestsChange = (e) => {
        const interest = e.target.value;
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter((i) => i !== interest));
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }

    };
    // hobbies
    const handleHobbiesChange = (selectedOptions) => {
        setSelectedHobbies(selectedOptions);

    };
    const handleSkillsChange = (selectedOptions) => {
        setSelectedSkills(selectedOptions);

    };
    const handleExperienceChange = (e) => {
        setExperience(e.target.value);

    };
    // experinece number
    const handleExperienceInputChange = (e) => {
        setExperienceInput(parseInt(e.target.value, 10));

    };

    const handleBorderColorChange = (e) => {
        setSelectedBorderColor(e.target.value);
    };
    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);

    };


    // handle submit
    // handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(firstName);
        console.log(lastName);
        console.log(email);
        console.log(password);
        console.log(confirmPassword);
        console.log(dob);
        console.log(selectedCountry); // Use selectedCountry state here
        console.log(phoneNumber);
        console.log(selectedGender);
        console.log(selectedInterests);
        console.log(selectedHobbies);
        console.log(selectedSkills);
        console.log(experience);
        console.log(profileImage);

        // handling form data
        const formData = {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            dob: dob ? dob.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : null,
            phoneNumber,
            selectedCountry,
            selectedGender,
            selectedInterests,
            selectedHobbies,
            selectedSkills,
            experience,
            selectedBorderColor,
        };
        // Create a FormData object to handle file upload (Profile Image)
        const formDataUpload = new FormData();
        formDataUpload.append('profileImage', profileImage);

        // Loop through the formData object and append each key-value pair to formDataUpload
        Object.entries(formData).forEach(([key, value]) => {
            formDataUpload.append(key, value);
        });

        try {
            // Send the POST request to the specified URL
            const response = await axios.post('http://localhost:5000/api/v1/register', formDataUpload, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the appropriate Content-Type for file upload
                },
            });

            // Handle the response
            console.log('Response:', response.data); // Log the response data
            if (response.data) {
                alert("user registered successfully")
                // useNavigate hook from react-router-dom to redirect it login page

                navigate('/auth/login')

            }
            // Additional logic based on response if needed
        } catch (error) {
            // Handle errors
            console.error('Error:', error);
            // Additional error handling logic if needed
        }
    };

    return (
        <>
            <div className="container py-4 px-4 my-4 bg-dark text-white">
                <form style={{ backgroundColor: `${selectedBorderColor}` }} onSubmit={handleSubmit}>
                    <h4 className="text-center text-warning">User Registration Form</h4>
                    {/* firstName */}
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            placeholder="First Name"
                            name="firstName"
                            value={firstName}
                            onChange={handleFirstNameChange}
                            required
                        />
                    </div>
                    {/* last name */}
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            placeholder="Last Name"
                            name="lastName"
                            value={lastName}
                            onChange={handleLastNameChange}

                        />
                    </div>
                    {/* email */}
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleEmailChange}
                            value={email}
                        />
                    </div>
                    {/* password */}
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            name="password"
                            onChange={handlePasswordChange}
                            value={password}
                        />
                    </div>
                    {/* confirm password */}
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            onChange={handleConfirmPasswordChange}
                            value={confirmPassword}
                        />
                    </div>
                    {/* dob */}
                    <DatePicker
                        selected={dob}
                        onChange={handleDateChange}
                        placeholderText="Date of Birth"
                        className="form-control"
                        id="dob"
                        name="dob"
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={50}
                        showTimeInput
                    />
                    {/* country selector */}
                    <div className="mb-3">country
                        <select
                            value={selectedCountry}
                            onChange={(e) => handleCountryChange(e.target.value)}
                            className="form-control"
                        >
                            <option value="">Select Country</option>
                            <option value="PK">Pakistan</option>
                            <option value="RU">Russia</option>
                            <option value="US">United States</option>
                            {/* Add more countries as needed */}
                        </select>
                    </div>
                    {/* phone */}
                    <PhoneInput
                        placeholder="Phone Number +92"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        defaultCountry="PK"
                        country={selectedCountry}

                    />
                    {/* gender */}
                    <div className="mb-3">
                        <label>Gender:</label>
                        <div>
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="male"
                                checked={selectedGender === 'male'}
                                onChange={handleGenderChange}
                            />
                            <label htmlFor="male">Male</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="female"
                                checked={selectedGender === 'female'}
                                onChange={handleGenderChange}
                            />
                            <label htmlFor="female">Female</label>
                        </div>
                    </div>
                    {/* check boxes - interests */}
                    {/* Interests checkboxes */}
                    <div className="mb-3">
                        <label>Interests:</label>
                        <div>
                            <input
                                type="checkbox"
                                id="javascript"
                                name="interests"
                                value="JavaScript"
                                checked={selectedInterests.includes('JavaScript')}
                                onChange={handleInterestsChange}
                            />
                            <label htmlFor="javascript">JavaScript</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="php"
                                name="interests"
                                value="PHP"
                                checked={selectedInterests.includes('PHP')}
                                onChange={handleInterestsChange}
                            />
                            <label htmlFor="php">PHP</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label>Hobbies:</label>
                        <Select
                            isMulti
                            options={hobbiesOptions}
                            value={selectedHobbies}
                            onChange={handleHobbiesChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Skills:</label>
                        <Creatable
                            isMulti
                            options={skillsOptions}
                            value={selectedSkills}
                            onChange={handleSkillsChange}
                        />
                    </div>
                    {/* range experience */}

                    {/* exp num */}
                    <div className="mb-3">
                        <label>Years of Experience:</label>
                        <input
                            type="range"
                            min="0"
                            max="30"
                            value={experienceInput}
                            onChange={(e) => {
                                handleExperienceInputChange(e);
                                setExperience(e.target.value);
                            }}
                            className="form-control-range"
                        />
                        <span>{experienceInput} years</span>
                    </div>
                    <div className="mb-3">
                        <label>Years of Experience (Numeric):</label>
                        <input
                            type="number"
                            min="0"
                            max="30"
                            value={experienceInput}
                            onChange={handleExperienceInputChange}
                            className="form-control"
                        />
                    </div>


                    <div className="mb-3">
                        <label>Choose Profile Picture Border Color:</label>
                        <input
                            type="color"
                            value={selectedBorderColor}
                            onChange={handleBorderColorChange}
                        />
                    </div>
                    {/* profile image */}
                    {/* Profile Image Upload */}
                    <div className="mb-3">
                        <label>Profile Image:</label>
                        <input
                            type="file"
                            accept=".jpg, .jpeg, .png, .gif"
                            onChange={handleProfileImageChange}
                            className="form-control-file"
                            name='profileImage'
                        />
                    </div>

                    {/* submit button */}
                    <div className="mb-3 text-center">
                        <button className="btn btn-primary form-control" type="submit" >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register