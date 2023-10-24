import React, { useState } from "react";
import { AutoComplete } from "antd";
import { CloseSquareFilled } from "@ant-design/icons";

type CityState = {
  setCityName: string;
  cityName: string;
};

const CityName: React.FC<CityState> = ({ setCityName, cityName }) => {
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const handleSearch = (value: string) => {
    let res: { value: string; label: string }[] = [];
    if (!value) {
      res = [];
    } else {
      const cityNames = [
        "Karachi",
        "Lahore",
        "Faisalabad",
        "Rawalpindi",
        "Multan",
        "Hyderabad",
        "Gujranwala",
        "Peshawar",
        "Quetta",
        "Islamabad",
        "Sargodha",
        "Sialkot",
        "Bahawalpur",
        "Sukkur",
        "Jhang",
        "Shekhupura",
        "Larkana",
        "Gujrat",
        "Mardan",
        "Kasur",
        "Rahim yar khan",
        "Sahiwal",
        "Okara",
        "Wah",
        "Dera ghazi khan",
        "Mirpur khas",
        "Nawabshah",
        "Mingora",
        "Chiniot",
        "Kamoke",
        "Burewala",
        "Jhelum",
        "Sadiqabad",
        "Jacobabad",
        "Shikarpur",
        "Khanewal",
        "Hafizabad",
        "Kohat",
        "Muzaffargarh",
        "Khanpur",
        "Gojra",
        "Bahawalnagar",
        "Muridke",
        "Pakpattan",
        "Abottabad",
        "Jaranwala",
        "Tando adam",
        "Khairpur",
        "Chishtian mandi",
        "Daska",
        "Dadu",
        "Mandi bahauddin",
        "Ahmadpur east",
        "Kamalia",
        "Khuzdar",
        "Vihari",
        "Dera ismail khan",
        "Wazirabad",
        "Nowshera",
        "Khushab",
        "Tando allah yar",
        "Charsadda",
        "Chakwal",
        "Mianwali",
        "Kot addu",
        "Swabi",
        "Arifwala",
        "Chichawatni",
        "Kharian",
        "Taxila",
        "Lieah",
        "Hasilpur",
        "Attock",
        "Jalalpur jattan",
        "Bhakkar",
        "Turbat",
        "Khandh kot",
        "Chaman",
        "Lodhran",
        "Mian channun",
        "Hub",
        "Harunabad",
        "Tando muhammad khan",
        "Shorkot",
        "Badin",
        "Kotri",
        "Bhalwal",
        "Pano aqil",
        "Shahdadkot",
        "Lalamusa",
        "Moro",
        "Shahdadpur",
        "Kot abdul malik",
        "Toba tek singh",
        "Pattoki",
        "Kahror pakka",
        "Chuhar kana",
        "Kambar",
        "Gujar khan",
        "Narowal",
        "Shujaabad",
        "Dipalpur",
        "Bai pheru",
        "Ferozwala",
        "Sammundri",
        "Mailsi",
        "Shabqadar",
        "Mansehra",
        "Haveli",
        "Ghotki",
        "Jampur",
        "Sanghar",
        "Shakargarh",
        "Sangala hill",
        "Takhat bhai",
        "Nankana sahib",
        "Sambrial",
        "Sibi",
        "Hujra shah muqim",
        "Haripur",
        "Bannu",
        "Kabirwala",
        "Chunian",
        "Ghakar",
        "Zhob",
        "Rohri",
        "Pasrur",
        "Gwadar",
        "Timargara",
        "Rajanpur",
        "Rabwah",
        "Matli",
        "Dullewala",
        "Mirpur mathelo",
        "Qila disar singh",
        "Hala",
        "Ratodero",
        "Shahkot",
        "Hadali",
        "Jauharabad",
        "Alipur chatha",
        "Kahna nau",
        "Kot radha kishan",
        "Dina",
        "Bat khela",
        "Jatoi",
        "Taunsa",
        "?abdul hakim",
        "Hasan abdal",
        "Dera murad jamali",
        "Dera allah yar",
        "Sarai alamgir",
        "Kamra",
        "Usta muhammad",
        "Mustafabad",
        "Thatta",
        "Talagang",
        "Basirpur",
        "Umarkot",
        "Fort abbas",
        "Kot moman",
        "Sehwan",
        "Khalabat",
        "Tank",
        "Nowshera virkan",
        "Tandlianwala",
        "Ludhewala waraich",
        "Daharki",
        "Dinga",
        "Kundian",
        "Badah",
        "Chak azam sahu",
        "Sahiwal",
        "Loralai",
        "Jalalpur pirwala",
        "Chak jhumra",
        "Liaqatpur",
        "Renala khurd",
        "Havelian",
        "Risalpur",
        "Bhera",
        "Pabbi",
        "Malakwal",
        "Jahangira",
        "Lakki marwat",
        "Topi",
        "Hangu",
        "Pirmahal",
        "Khurianwala",
        "Chitral",
        "Pindi gheb",
        "Pindi bhattian",
        "Pirjo goth",
        "Narang",
        "Mehrabpur",
        "Dunyapur",
        "Zahir pir",
        "Thul",
        "Alipur",
        "Lalian",
        "Gambat",
        "Kashmor",
        "Pasni",
        "Naudero",
        "Sukheke",
        "Khewra",
        "Tordher",
        "Setharja",
        "Mamu kanjan",
        "Sharqpur",
        "Karak",
        "Raiwind",
        "Digri",
        "Tando jam",
        "Sakrand",
        "Khairpur tamewali",
        "Kharan",
        "Chak sarwar shahid",
        "Khundian",
        "Khangah dogran",
        "Mehar",
        "Liaqatabad",
        "Khairpur nathan shah",
        "Fateh jang",
        "Minchinabad",
        "Ghauspur",
        "Dir",
        "Jahanian",
        "Garh maharaja",
        "Mastung",
        "Tangi",
        "Utmanzai",
        "Tall",
        "Guddu",
        "Mananwala jodh singh",
        "Khipro",
        "Fazalpur",
        "Kunjah",
        "Tulamba",
        "Mitha tiwana",
        "Jhawarian",
        "Nushki",
        "Dijkot",
        "Nasirabad",
        "Sujawal",
        "Sita road",
        "Sillanwali",
        "Kalat",
        "Daud khel",
        "Kandiaro",
        "Hazro",
        "Kunri",
        "Zaida",
        "Dunga bunga",
        "Karor lal esan",
        "Kalur kot",
        "Jhudo",
        "Murree",
        "Kot diji",
        "Amangarh",
        "Faqirwali",
        "Ahmadpur sial",
        "Jalalpur bhattian",
        "Phalia",
        "Yazman",
        "Raja jang",
        "Samasatta",
        "Warburton",
        "Pishin",
        "Kamir",
        "Trinda sawai khan",
        "Uch",
        "Jamke chima",
        "Safdarabad",
        "Chawinda",
        "Chitkan",
        "Nawan shehr",
        "Ubauro",
        "Mithi",
        "Zafarwal",
        "Kot samaba",
        "Akora",
        "Eminabad",
        "Kahuta",
        "Theri",
        "Ranipur",
        "Pind dadan khan",
        "Khanpur",
        "Kulachi",
        "Hingorja",
        "Kanganpur",
        "Faruka",
        "Naukot",
        "Kotli loharan",
        "Shahpur chakar",
        "Talhar",
        "Nawan killi",
        "Shadiwal",
        "Padidan",
        "Kot ghulam mohammad",
      ];

      res = cityNames
        .filter((name) => name.toLowerCase().startsWith(value.toLowerCase()))
        .map((name) => ({
          value: name,
          label: name,
        }));
    }
    console.log(res, "Sdfsdfds");
    setOptions(res);
  };
  const handleSelect = (value: string) => {
    setCityName(value);
  };
  return (
    <AutoComplete
      style={{ width: 150 }}
      onSearch={handleSearch}
      onSelect={handleSelect}
      placeholder="City"
      options={options}
      className=" placeholder:text-black placeholder:text-base  cursor-pointer"
      bordered={false}
      value={cityName}
      allowClear={true}
    />
  );
};

export default CityName;