import { Button, Col, DatePicker, Divider, Input, Row, Select, Space } from "antd";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../store/user-context";
import classes from "./applications.module.css";
import { useParams } from 'react-router-dom'
import "./applications.module.css";
const dateFormat = 'YYYY-MM-DD';

function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
}

const NewApplication = () => {

    const userCtx = useContext(UserContext)
    const history = useHistory();
    const param = useParams();
    const id = param.id;
    const [requirements, setRequirements] = useState([]);
    const [details, setDetails] = useState({});
    const [newTitle, setNewTitle] = useState();
    const [newVale, setNewValue] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [description, setDescription] = useState();
    const [deadline, setDeadline] = useState();
    const [jobType, setJobType] = useState();
    const [title, setTitle] = useState();
    const [city, setCity] = useState();
    const [country, setCountry] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [field, setField] = useState();
    const [addingReq, setAddingReq] = useState(false);
    const [addingDet, setAddingDet] = useState(false);
    const [application, setApplication] = useState({});
    const requirement = useRef();

    useEffect(() => {

        if (id) {
            axios.get("http://localhost:2000/forms/" + id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userCtx.token
                }
            })
                .then(res => {

                    if (res.status === 200) {
                        // console.log(res.data.value)
                        const app = res.data.value;
                        setRequirements(app.requirements)
                        setDetails(app.details || {})
                        setDescription(app.description)
                        setDeadline(app.deadline)
                        setJobType(app.jobType)
                        setTitle(app.title)
                        setCity(app.location.city)
                        setCountry(app.location.country)
                        setEmail(app.email)
                        setPhone(app.phone)
                        setField(app.field)
                    } else {
                        throw new Error('wrong');
                    }
                }).catch(err => {
                    // setIsLoading(false);
                    // console.log(err)
                });
        }
    }, [])
    const addingRequirementHandler = () => {
        const temp = requirements;
        temp.push(requirement.current.state.value);
        setRequirements(temp);
        setAddingReq(false)
        // console.log(temp)
    }

    const addingDetailHandler = () => {
        const temp = details;
        // console.log(newTitle)
        temp.newTitle = newVale;
        setDetails(temp);
        setAddingDet(false)
    }

    const publishHandler = () => {

        const sentForm = {
            description,
            deadline,
            jobType,
            title,
            location: { city, country },
            email,
            phone,
            details,
            field
        }
        if (requirements.length > 0)
            sentForm.requirements = requirements;

        if (details && !(Object.keys(details).length === 0 && details.constructor === Object))
            sentForm.details = details;
        // console.log(sentForm)

        setIsLoading(true);
        const config = {
            method: 'patch',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userCtx.token
            },
            url: "http://localhost:2000/forms/" + id,
            data: sentForm

        };
        if (!id) {
            config.method = 'POST';
            config.url = "http://localhost:2000/forms";
        }

        axios(config)
            .then(res => {

                // console.log(res.data.token)
                if (res.status === 200) {
                    setIsLoading(false);
                    history.replace('/applications');
                } else {
                    throw new Error('wrong');
                }
            }).catch(err => {
                setIsLoading(false);
            });
    }

    const changeDetailHAndler = (key, value) => {

        const temp = details;
        temp[key] = value;
        setDetails(temp);
    }
    return <>
        <div className={`container ${classes.cardsGroup}`} style={{ backgroundColor: '#FFFFFFBA', border: 'solid #0E2882' }}>
            <div className={'row'}>
                <Space style={{ border: '' }} className={`justify-content-center`}>
                    <label className={`${classes.label}`}>Title</label>
                    <Input className={`${classes.customInput}`} placeholder={'Graphic designer'}
                        onChange={(e) => setTitle(e.target.value)} value={title} />
                    <label className={`${classes.label}`}>Deadline</label>
                    <DatePicker value={deadline ? moment(deadline, dateFormat) : null}
                        disabledDate={disabledDate} className={`${classes.customInput}`}
                        format={dateFormat} onChange={(e) => setDeadline(e._d)} />
                </Space>
            </div>
            <Divider orientation={'center'} style={{ fontWeight: 'bold', borderColor: '#0E2882' }} >Description</Divider>
            <div className={'row justify-content-center'} style={{ marginTop: '40px', border: '' }}>
                <TextArea className={`${classes.textarea}`} maxLength={500} showCount placeholder="Please type a brief description about the job" value={description}
                    style={{ height: 200, width: '80%', border: '', borderRadius: '15px', backgroundColor: '' }} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <Divider orientation={"left"} style={{ fontWeight: "bold", borderColor: '#0E2882' }}>Requirements</Divider>
            <div className={'row'}>
                <div>
                    <Button className={`float-end ${classes['custom-btn']}`} onClick={() => setAddingReq(true)}>Add a requirement</Button>
                </div>

                <br />
                {addingReq && <space className={` justify-content-start`}>
                    <Input ref={requirement} className={`${classes.customInput}`} style={{ width: '30%', marginLeft: '10%' }}
                        placeholder={'type a requirement'} />
                    <span style={{ color: 'darkblue', cursor: 'pointer', marginLeft: '2px', marginRight: '5px' }}
                        onClick={addingRequirementHandler}>Add</span>|
                    <span style={{ color: 'darkblue', cursor: 'pointer', marginLeft: '7px' }} onClick={() => setAddingReq(false)}>Cancel</span>
                </space>}
                <space className={` justify-content-start`}>
                    {requirements.map((req) => <p className={`${classes.customInput}`} style={{ width: '30%', marginLeft: '10%' }}>-{req}</p>)}
                </space>
            </div>
            <Divider orientation={"left"} style={{ fontWeight: "bold", borderColor: '#0E2882' }}>Details</Divider>
            <div className={'row'}>
                <div>
                    <Button className={`float-end ${classes['custom-btn']}`} onClick={() => setAddingDet(true)}>Add details</Button>
                </div>
                {addingDet && <space className={` justify-content-start`}>
                    <Input className={`${classes.customInput}`} style={{ width: '20%', marginLeft: '10%' }} placeholder={'title'}
                        onChange={(e) => setNewTitle(e.target.value)} />
                    <Input className={`${classes.customInput}`} style={{ width: '20%', marginLeft: '5%' }} placeholder={'value'}
                        onChange={(e) => setNewValue(e.target.value)} />
                    <span style={{ color: 'darkblue', cursor: 'pointer', marginLeft: '2px', marginRight: '5px' }}
                        onClick={addingDetailHandler}>Add</span>|
                    <span style={{ color: 'darkblue', cursor: 'pointer', marginLeft: '7px' }} onClick={() => setAddingDet(false)}>Cancel</span>
                    <br />
                    <br />
                </space>}
                <Row style={{ border: '' }} className={`justify-content-center`}>
                    <Col >
                        <label className={`${classes.label}`} style={{ textAlign: 'center' }}>Job type</label>
                        <Select className={`${classes.customInput}`} value={jobType} style={{ textAlign: 'center', width: '100%' }}
                            placeholder={'Choose type'} showSearch onChange={(e) => setJobType(e)} id="country" name="country">
                            <option value="Full time">Full time</option>
                            <option value="Part time">Part time</option>
                        </Select>
                    </Col>
                    <Col >
                        <label className={`${classes.label}`} style={{ textAlign: 'center' }}>city</label>
                        <Input className={`${classes.customInput}`} style={{ textAlign: 'center' }} placeholder={'Nablus'}
                            onChange={(e) => setCity(e.target.value)} value={city} defaultValue={city} />
                    </Col>
                    <Col >
                        <label className={`${classes.label}`} style={{ textAlign: 'center' }}>Country</label>
                        <Select className={`${classes.customInput}`} style={{ textAlign: 'center', width: '100%' }}
                            placeholder={'Palestine'} value={country} showSearch onChange={(e) => setCountry(e)}>
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
                    </Col>
                    <Col >
                        <label className={`${classes.label}`} style={{ textAlign: 'center' }}>Job field</label>
                        <Input className={`${classes.customInput}`} style={{ textAlign: 'center' }} placeholder={'field'}
                            onChange={(e) => setField(e.target.value)} value={field} defaultValue={field} />
                    </Col>
                    {details && Object.entries(details).map(([key, value]) => <Col >
                        <label className={`${classes.label}`} style={{ textAlign: 'center' }}>{key}</label>
                        <Input className={`${classes.customInput}`} style={{ textAlign: 'center' }}
                            onChange={(e) => changeDetailHAndler(key, e.target.value)}
                            defaultValue={value} placeholder={key} />
                    </Col>)
                    }

                </Row>
            </div>
            <Divider orientation={"left"} style={{ fontWeight: "bold", borderColor: '#0E2882' }}>Contacts</Divider>

            <div className={'row'}>
                <Space className={`justify-content-center`}>
                    <b>Phone: </b>
                    <Input className={`${classes.customInput}`} value={phone} placeholder={'0599121311'}
                        onChange={(e) => setPhone(e.target.value)} ></Input>

                    <b>E-mail: </b>
                    <Input className={`${classes.customInput}`} value={email} placeholder={'example@gmai.com'}
                        onChange={(e) => setEmail(e.target.value)}  ></Input>
                </Space>
            </div>
            <Divider orientation={'right'} style={{ fontWeight: 'normal', borderColor: 'transparent' }} />

            <div className={`d-flex justify-content-center`}>
                <Button loading={isLoading} className={` ${classes['custom-btn']}`} type='button'
                    onClick={publishHandler}>{id ? 'Update' : 'Publish'}</Button>
                <Button className={` ${classes['custom-btn']}`} style={{ marginLeft: '10px' }} type='button'
                    onClick={() => history.push('/applications')}>Cancel</Button>
            </div>
        </div>
    </>;
}

export default NewApplication;