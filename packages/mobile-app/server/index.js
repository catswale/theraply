// import jwt_decode from "jwt-decode";
const jwt_decode = require('jwt-decode')

var token = "eyJraWQiOiJBYTcrbldkMStjazJCUkxuSnVpSHVwcGhKOEFkWDNFM05hcllEUUhnc3RnPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIyODZjYzRlMS0yN2U2LTQyODItOTJmMi1kMzA1NGNmMjk3ODUiLCJhdWQiOiIzZDZpa2JsaHV2ZjI3bGw0ZHExZmRlbjljcCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6IjMzMmQ1YzU2LTcwOTgtNGFiMi05YzdlLWM3M2U4ZmE0N2JjNSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjA5NjU5MTQxLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGhlYXN0LTIuYW1hem9uYXdzLmNvbVwvYXAtc291dGhlYXN0LTJfeU1pZU16ejVvIiwiY29nbml0bzp1c2VybmFtZSI6IjI4NmNjNGUxLTI3ZTYtNDI4Mi05MmYyLWQzMDU0Y2YyOTc4NSIsImV4cCI6MTYwOTkwODQyMCwiZ2l2ZW5fbmFtZSI6Ik1hcnkiLCJpYXQiOjE2MDk5MDQ4MjAsImVtYWlsIjoiY2F0c3dhbGUrbWFyeUBnbWFpbC5jb20ifQ.KqvxyT6BzrTLnGjZG89SHcXZbKjvIvtfOR0ojCeV8XT1WmI9uIAR4Pd4BrB0nzv0kzbbebCHBrOBuBqQRMdSpC4bgH_AXoUxivRkYP4zLbCdWLGAHHLwD2dPT5_nqwL8lNgUsPtB0K5qs7VR4JNKtfzHb9Q2aT59h4abZ4WvFiESAUn4t5O5SyEfiuKizLAH4ieJEFeIXWfEhQdcwXooGY9SCRnrzdVJMW456duQFikVn5TU3g3hhGL7rASl1yHoY0DFmCAR4ev_OC_1u4SQW9k02jsWs4vBayFhO2z8d_J7btI3e-46wGmfoBwLZ9CILFP8KMq8FE3Ifc4idciBkg";
var decoded = jwt_decode(token);
 
console.log(decoded);