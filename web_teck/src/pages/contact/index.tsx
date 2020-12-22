import React from 'react'
import Header from 'src/components/Header/Header'

const Contact = () => {
  return (
    <>
      <Header />
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-md-6 mb-9" data-aos="fade-up">
              <table cellSpacing={0} width="100%" border="0">
                <tbody>
                  <tr>
                    <td valign="top" width="230">
                      <img alt="" src="/images/contact.jpg" style={{ width: '200px' }} />
                    </td>

                    <td valign="top">
                      <form
                        id="fcontact"
                        method="post"
                        action="/contact.html"
                        //   onSubmit="return sendcontact('6');"
                      >
                        <input
                          type="hidden"
                          name="checkss"
                          value="e0d60b804372126d6d12c4a785e25a49"
                        />
                        <input type="hidden" name="fpart" value="2" />
                        <div className="contact_form">
                          <p>
                            Tiêu đề: <br />
                            <input
                              type="text"
                              maxLength="255"
                              value=""
                              id="ftitle"
                              name="ftitle"
                              style={{ width: '98%' }}
                            />
                          </p>
                          <p>
                            Họ và tên: <br />
                            <input
                              type="text"
                              maxLength="100"
                              value=""
                              id="fname"
                              name="fname"
                              style={{ width: '98%' }}
                            />
                          </p>
                          <p className="rows">
                            Địa chỉ email: <br />
                            <input
                              type="text"
                              maxLength="60"
                              value=""
                              id="femail_iavim"
                              name="femail"
                              style={{ width: '98%' }}
                            />
                          </p>
                          <p>
                            Điện thoại: <br />
                            <input
                              type="text"
                              maxLength="60"
                              value=""
                              id="fphone"
                              name="fphone"
                              style={{ width: '98%' }}
                            />
                          </p>
                          <p className="rows" style={{ display: 'none' }}>
                            Gửi đến bộ phận: <br />
                            <select className="sl2" id="fpart" name="fpart">
                              <option value="1">Webmaster</option>
                            </select>
                          </p>
                          <p>
                            Nội dung: <br />
                            <textarea
                              cols={4}
                              style={{ width: '98%' }}
                              id="fcon"
                              name="fcon"
                              onKeyUp="return nv_ismaxlength(this, 1000);"
                            />
                          </p>
                          {/* <p className="clearfix">
                          Mã bảo mật: <br />
                          <img
                            height="40"
                            src="/index.php?scaptcha=captcha"
                            title="Mã chống spam"
                            alt="Mã chống spam"
                            id="vimg"
                            className="fl"
                          />
                          <input
                            type="text"
                            maxLength="6"
                            value=""
                            id="fcode_iavim"
                            name="fcode"
                            className="fl"
                          />
                        </p> */}
                          <p align="right">
                            <input
                              type="submit"
                              value="Gửi thông tin"
                              id="btsend"
                              name="btsend"
                              className="button"
                            />
                            &nbsp;
                          </p>
                        </div>
                      </form>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
