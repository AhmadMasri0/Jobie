import classes from "./edit-profile.module.css";
import { Container } from "react-bootstrap";
import { Button, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../store/user-context";
import { useHistory } from 'react-router-dom';
import { Radio, Space, Upload, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";

const { option } = Select;
const EditProfile = () => {

    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const userCtx = useContext(UserContext);
    const [user, setUser] = useState(userCtx.user);
    const [name, setName] = useState(user.name || '');
    const token = userCtx.token;
    const [gender, setGender] = useState(user.gender);
    const [city, setCity] = useState(user.location ? user.location.city : '');
    const [country, setCountry] = useState(user.location ? user.location.country : '');
    const [bio, setBio] = useState(user.bio || '');
    const [profession, setProfession] = useState(user.specialization || '');
    const [image, setImage] = useState();
    const [isEmpty, setIsEmpty] = useState(true);
    const [isImgLoading, setIsImgLoading] = useState(false);

    useEffect(() => {
        setUser(userCtx.user)
        // console.log(userCtx.user)
        return function f() {
            setBio(user.bio);
            setCity(user.location ? user.location.city : '');
            setCountry(user.location ? user.location.country : '');
            setGender(user.gender);
            setProfession(user.specialization);
            setName(user.name);

        }();
    }, [userCtx.user, user])


    useEffect(() => {

        // console.log(userCtx.user)
        // setIsImgLoading(false)

        axios.get(`http://localhost:2000/users/${user._id}/avatar`, {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token
            }
        }).then(data => {
            if (!data)
                throw new Error('Wrong')
            setImage(data.data)

        }).catch(err => console.log(err))
    }, [image])

    useEffect(() => {

        // console.log(typeof bio)
        if (name === '' || city === '' || profession === '' || bio === '')
            setIsEmpty(true)
        else
            setIsEmpty(false);

    }, [name, city, profession, bio])

    const submitHandler = () => {
        setIsLoading(true);

        const sentData = {
            name,
            bio,
            specialization: profession,
            location: { city, country },
        };

        if (user.userType !== 'Business')
            sentData.gender = gender;

        axios.patch(`http://localhost:2000/users/me`, sentData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                setIsLoading(false)

                if (res.status === 200) {
                    userCtx.setCurrentUser(res.data)
                    history.replace('/profile');
                } else {
                    throw new Error('wrong');
                }
            }).catch(err => {
                setIsLoading(false)
                console.log(err)
            });


    }
    const cancelHandler = () => {
        history.push('/profile');
    }

    const uploadImageHandler = ({ fileList }) => {

        setIsImgLoading(true)
        let formData = new FormData();
        formData.append('avatar', fileList[0].originFileObj);
        axios.post(`http://localhost:2000/users/me/avatar`, formData, {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {

                axios.get(`http://localhost:2000/users/${user._id}/avatar`, {
                    headers: {
                        'content-type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + token
                    }
                }).then(data => {

                    if (!data)
                        throw new Error('Wrong')
                    setImage(data.data)
                    setIsImgLoading(false)

                }).catch(err => {
                    console.log(err)
                    setIsImgLoading(false)
                })
            })
            .catch(err => console.log(err));
        // setIsImgLoading(false)
    }


    const imgSrc = image ? `data:image/png;base64,${image}` : 'https://media.istockphoto.com/vectors/profile-placeholder-image-gray-silhouette-no-photo-vector-id1016744004?k=20&m=1016744004&s=612x612&w=0&h=Z4W8y-2T0W-mQM-Sxt41CGS16bByUo4efOIJuyNBHgI='

    return <div className='container'>
        <div className={`row ${classes.firstRow} justify-content-md`}>
            <div className="col-lg-12 col-md-12 col-sm-12">
                <Spin spinning={isImgLoading}>
                    <div className={classes['about-avatar']}>
                        <img src={imgSrc} alt={name} />
                    </div>
                </Spin>
                <Upload maxCount={1} setName="avatar" showUploadList={false} action={'http://localhost:2000/users/me/avatar'}
                    listType={'picture'} className={classes.span} customRequest={uploadImageHandler} accept={'image/*'}
                    beforeUpload={() => false} onChange={uploadImageHandler}  >
                    Edit profile picture
                </Upload>
            </div>
        </div>
        <Spin spinning={isLoading} >
            <Container className={`container-fluid ${classes.group}`}>
                <div className={`row`}>
                    <div className={`${user && user.userType === 'Business' ? 'col-lg-12 col-md-12' :
                        'col-lg-6 col-md-6'}justify-content col-sm-12 col-xs-12`} >
                        <div style={user && user.userType === 'Business' ? { marginLeft: '25%' } : {}}>
                            <label htmlFor="username" className={classes.input}>Username</label>
                            <input type="text" placeholder={'Will Smith'} onChange={e => setName(e.target.value)} className={classes.customInput}
                                value={name} />
                        </div>
                    </div>
                    {user && user.userType !== 'Business' && <div className="col-lg-6 col-md-6 col-sm-12 justify-content col-xs-12">
                        <label htmlFor='gender' className={classes.input}>Gender:</label>
                        <Space direction="horizontal" className={classes.input}>
                            <Radio.Group onChange={(e) => setGender(e.target.value)} name={'gender'} value={gender}
                            >
                                <Space direction="horizontal">
                                    <Radio value={'male'}>Male</Radio>
                                    <Radio value={'female'}>Female</Radio>
                                </Space>
                            </Radio.Group>
                        </Space>
                    </div>}
                </div>
                <hr />
                <div className='row'>
                    <div className="col-lg-6 col-md-6 col-sm-12 justify-content col-xs-12">
                        <label htmlFor="city" className={classes.input}>City</label>
                        <input type="text" placeholder={'Nablus'} className={`${classes.input} ${classes.customInput}`}
                            onChange={e => setCity(e.target.value)} value={city} />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 justify-content col-xs-12">
                        <label htmlFor="country" className={classes.input}>Country</label>
                        <Select showSearch onChange={(e) => setCountry(e)} className={classes.input} placeholder={'country'}
                            value={country}
                            id="country" name="country">
                            <option value="Afganistan">Afghanistan</option>
                            <option value="Albania">Albania</option>
                            <option value="Algeria">Algeria</option>
                            <option value="American Samoa">American Samoa</option>
                            <option value="Andorra">Andorra</option>
                            <option value="Angola">Angola</option>
                            <option value="Anguilla">Anguilla</option>
                            <option value="Antigua & Barbuda">Antigua & Barbuda</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Armenia">Armenia</option>
                            <option value="Aruba">Aruba</option>
                            <option value="Australia">Australia</option>
                            <option value="Austria">Austria</option>
                            <option value="Azerbaijan">Azerbaijan</option>
                            <option value="Bahamas">Bahamas</option>
                            <option value="Bahrain">Bahrain</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Barbados">Barbados</option>
                            <option value="Belarus">Belarus</option>
                            <option value="Belgium">Belgium</option>
                            <option value="Belize">Belize</option>
                            <option value="Benin">Benin</option>
                            <option value="Bermuda">Bermuda</option>
                            <option value="Bhutan">Bhutan</option>
                            <option value="Bolivia">Bolivia</option>
                            <option value="Bonaire">Bonaire</option>
                            <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
                            <option value="Botswana">Botswana</option>
                            <option value="Brazil">Brazil</option>
                            <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
                            <option value="Brunei">Brunei</option>
                            <option value="Bulgaria">Bulgaria</option>
                            <option value="Burkina Faso">Burkina Faso</option>
                            <option value="Burundi">Burundi</option>
                            <option value="Cambodia">Cambodia</option>
                            <option value="Cameroon">Cameroon</option>
                            <option value="Canada">Canada</option>
                            <option value="Canary Islands">Canary Islands</option>
                            <option value="Cape Verde">Cape Verde</option>
                            <option value="Cayman Islands">Cayman Islands</option>
                            <option value="Central African Republic">Central African Republic</option>
                            <option value="Chad">Chad</option>
                            <option value="Channel Islands">Channel Islands</option>
                            <option value="Chile">Chile</option>
                            <option value="China">China</option>
                            <option value="Christmas Island">Christmas Island</option>
                            <option value="Cocos Island">Cocos Island</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Comoros">Comoros</option>
                            <option value="Congo">Congo</option>
                            <option value="Cook Islands">Cook Islands</option>
                            <option value="Costa Rica">Costa Rica</option>
                            <option value="Cote DIvoire">Cote DIvoire</option>
                            <option value="Croatia">Croatia</option>
                            <option value="Cuba">Cuba</option>
                            <option value="Curaco">Curacao</option>
                            <option value="Cyprus">Cyprus</option>
                            <option value="Czech Republic">Czech Republic</option>
                            <option value="Denmark">Denmark</option>
                            <option value="Djibouti">Djibouti</option>
                            <option value="Dominica">Dominica</option>
                            <option value="Dominican Republic">Dominican Republic</option>
                            <option value="East Timor">East Timor</option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="Egypt">Egypt</option>
                            <option value="El Salvador">El Salvador</option>
                            <option value="Equatorial Guinea">Equatorial Guinea</option>
                            <option value="Eritrea">Eritrea</option>
                            <option value="Estonia">Estonia</option>
                            <option value="Ethiopia">Ethiopia</option>
                            <option value="Falkland Islands">Falkland Islands</option>
                            <option value="Faroe Islands">Faroe Islands</option>
                            <option value="Fiji">Fiji</option>
                            <option value="Finland">Finland</option>
                            <option value="France">France</option>
                            <option value="French Guiana">French Guiana</option>
                            <option value="French Polynesia">French Polynesia</option>
                            <option value="French Southern Ter">French Southern Ter</option>
                            <option value="Gabon">Gabon</option>
                            <option value="Gambia">Gambia</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Germany">Germany</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Gibraltar">Gibraltar</option>
                            <option value="Great Britain">Great Britain</option>
                            <option value="Greece">Greece</option>
                            <option value="Greenland">Greenland</option>
                            <option value="Grenada">Grenada</option>
                            <option value="Guadeloupe">Guadeloupe</option>
                            <option value="Guam">Guam</option>
                            <option value="Guatemala">Guatemala</option>
                            <option value="Guinea">Guinea</option>
                            <option value="Guyana">Guyana</option>
                            <option value="Haiti">Haiti</option>
                            <option value="Hawaii">Hawaii</option>
                            <option value="Honduras">Honduras</option>
                            <option value="Hong Kong">Hong Kong</option>
                            <option value="Hungary">Hungary</option>
                            <option value="Iceland">Iceland</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="India">India</option>
                            <option value="Iran">Iran</option>
                            <option value="Iraq">Iraq</option>
                            <option value="Ireland">Ireland</option>
                            <option value="Isle of Man">Isle of Man</option>
                            <option value="Israel">Israel</option>
                            <option value="Italy">Italy</option>
                            <option value="Jamaica">Jamaica</option>
                            <option value="Japan">Japan</option>
                            <option value="Jordan">Jordan</option>
                            <option value="Kazakhstan">Kazakhstan</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Kiribati">Kiribati</option>
                            <option value="Korea North">Korea North</option>
                            <option value="Korea Sout">Korea South</option>
                            <option value="Kuwait">Kuwait</option>
                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                            <option value="Laos">Laos</option>
                            <option value="Latvia">Latvia</option>
                            <option value="Lebanon">Lebanon</option>
                            <option value="Lesotho">Lesotho</option>
                            <option value="Liberia">Liberia</option>
                            <option value="Libya">Libya</option>
                            <option value="Liechtenstein">Liechtenstein</option>
                            <option value="Lithuania">Lithuania</option>
                            <option value="Luxembourg">Luxembourg</option>
                            <option value="Macau">Macau</option>
                            <option value="Macedonia">Macedonia</option>
                            <option value="Madagascar">Madagascar</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Malawi">Malawi</option>
                            <option value="Maldives">Maldives</option>
                            <option value="Mali">Mali</option>
                            <option value="Malta">Malta</option>
                            <option value="Marshall Islands">Marshall Islands</option>
                            <option value="Martinique">Martinique</option>
                            <option value="Mauritania">Mauritania</option>
                            <option value="Mauritius">Mauritius</option>
                            <option value="Mayotte">Mayotte</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Midway Islands">Midway Islands</option>
                            <option value="Moldova">Moldova</option>
                            <option value="Monaco">Monaco</option>
                            <option value="Mongolia">Mongolia</option>
                            <option value="Montserrat">Montserrat</option>
                            <option value="Morocco">Morocco</option>
                            <option value="Mozambique">Mozambique</option>
                            <option value="Myanmar">Myanmar</option>
                            <option value="Nambia">Nambia</option>
                            <option value="Nauru">Nauru</option>
                            <option value="Nepal">Nepal</option>
                            <option value="Netherland Antilles">Netherland Antilles</option>
                            <option value="Netherlands">Netherlands (Holland, Europe)</option>
                            <option value="Nevis">Nevis</option>
                            <option value="New Caledonia">New Caledonia</option>
                            <option value="New Zealand">New Zealand</option>
                            <option value="Nicaragua">Nicaragua</option>
                            <option value="Niger">Niger</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Niue">Niue</option>
                            <option value="Norfolk Island">Norfolk Island</option>
                            <option value="Norway">Norway</option>
                            <option value="Oman">Oman</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="Palau Island">Palau Island</option>
                            <option value="Palestine">Palestine</option>
                            <option value="Panama">Panama</option>
                            <option value="Papua New Guinea">Papua New Guinea</option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Peru">Peru</option>
                            <option value="Phillipines">Philippines</option>
                            <option value="Pitcairn Island">Pitcairn Island</option>
                            <option value="Poland">Poland</option>
                            <option value="Portugal">Portugal</option>
                            <option value="Puerto Rico">Puerto Rico</option>
                            <option value="Qatar">Qatar</option>
                            <option value="Republic of Montenegro">Republic of Montenegro</option>
                            <option value="Republic of Serbia">Republic of Serbia</option>
                            <option value="Reunion">Reunion</option>
                            <option value="Romania">Romania</option>
                            <option value="Russia">Russia</option>
                            <option value="Rwanda">Rwanda</option>
                            <option value="St Barthelemy">St Barthelemy</option>
                            <option value="St Eustatius">St Eustatius</option>
                            <option value="St Helena">St Helena</option>
                            <option value="St Kitts-Nevis">St Kitts-Nevis</option>
                            <option value="St Lucia">St Lucia</option>
                            <option value="St Maarten">St Maarten</option>
                            <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
                            <option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
                            <option value="Saipan">Saipan</option>
                            <option value="Samoa">Samoa</option>
                            <option value="Samoa American">Samoa American</option>
                            <option value="San Marino">San Marino</option>
                            <option value="Sao Tome & Principe">Sao Tome & Principe</option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="Senegal">Senegal</option>
                            <option value="Seychelles">Seychelles</option>
                            <option value="Sierra Leone">Sierra Leone</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Slovakia">Slovakia</option>
                            <option value="Slovenia">Slovenia</option>
                            <option value="Solomon Islands">Solomon Islands</option>
                            <option value="Somalia">Somalia</option>
                            <option value="South Africa">South Africa</option>
                            <option value="Spain">Spain</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="Sudan">Sudan</option>
                            <option value="Suriname">Suriname</option>
                            <option value="Swaziland">Swaziland</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Syria">Syria</option>
                            <option value="Tahiti">Tahiti</option>
                            <option value="Taiwan">Taiwan</option>
                            <option value="Tajikistan">Tajikistan</option>
                            <option value="Tanzania">Tanzania</option>
                            <option value="Thailand">Thailand</option>
                            <option value="Togo">Togo</option>
                            <option value="Tokelau">Tokelau</option>
                            <option value="Tonga">Tonga</option>
                            <option value="Trinidad & Tobago">Trinidad & Tobago</option>
                            <option value="Tunisia">Tunisia</option>
                            <option value="Turkey">Turkey</option>
                            <option value="Turkmenistan">Turkmenistan</option>
                            <option value="Turks & Caicos Is">Turks & Caicos Is</option>
                            <option value="Tuvalu">Tuvalu</option>
                            <option value="Uganda">Uganda</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="United Arab Erimates">United Arab Emirates</option>
                            <option value="United States of America">United States of America</option>
                            <option value="Uraguay">Uruguay</option>
                            <option value="Uzbekistan">Uzbekistan</option>
                            <option value="Vanuatu">Vanuatu</option>
                            <option value="Vatican City State">Vatican City State</option>
                            <option value="Venezuela">Venezuela</option>
                            <option value="Vietnam">Vietnam</option>
                            <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
                            <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
                            <option value="Wake Island">Wake Island</option>
                            <option value="Wallis & Futana Is">Wallis & Futana Is</option>
                            <option value="Yemen">Yemen</option>
                            <option value="Zaire">Zaire</option>
                            <option value="Zambia">Zambia</option>
                            <option value="Zimbabwe">Zimbabwe</option>

                        </Select>

                    </div>
                </div>
                <hr />
                <div className='row'>
                    <div className="col-lg-6 col-md-6 col-sm-12 justify-content col-xs-12">
                        <label htmlFor="profession" className={classes.input}>Profession</label>
                        <input type="text" onChange={e => setProfession(e.target.value)} className={`${classes.input} ${classes.customInput}`}
                            placeholder={'Developer'} value={profession} />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 justify-content col-xs-12">
                        <label htmlFor="bio" className={classes.input}>Bio</label>
                        <TextArea showCount maxLength={300} style={{ height: 120, width: '75%' }} className={`float-end ${classes.textarea}`}
                            onChange={(e) => setBio(e.currentTarget.value)}
                            name="bio" id="" placeholder="talk briefly about yourself" value={bio} />
                    </div>
                </div>
                <div className='row '>
                    <div className="col-lg-6 col-md-6 col-sm-12 justify-content col-xs-12">
                        <Button className={classes['custom-btn']} disabled={isEmpty} type='button' onClick={submitHandler}>Save</Button>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 justify-content col-xs-12">
                        <Button className={`float-md-none ${classes['custom-btn']}`} onClick={cancelHandler}
                            type='button'>Cancel</Button>
                    </div>
                </div>
            </Container>
        </Spin>
    </div>;
}

export default EditProfile;
