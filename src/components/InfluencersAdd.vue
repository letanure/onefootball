<template lang="pug">
  .InfluencersAdd
    .box
      form#form.form-inline(v-on:submit.prevent='addInfluencer', )

        .field
          label.label.
            Name
          .control
            input.input(type='text', v-model='influencer.name', placeholder='', required, )

        .field
          label.label.
            Influencer's official Instagram username
          .control
            input.input(type='text', v-model='influencer.instagram', placeholder='@', required, )

        .field
          label.label.
            Country (optional)
          .control
            .select
              select
                option(v-for='country in countries', v-model='influencer.country', :value='country.code', ).
                  {{ country.name }}

        .field
          label.label.
            Main category
          .control
            .select
              select-category(placeholder='Select the main category', v-model='influencer.category1')

        .field
          label.label.
            Second category (optional)
          .control
            .select
              select-category(placeholder='Select the second category', v-model='influencer.category2')

        .field
          label.label.
            Influencer's official Facebook Fan Page (optional)
          .control
            input.input(type='url', v-model='influencer.facebook', placeholder='', )

        .field
          label.label.
            Influencer's official Twitter handle (optional)
          .control
            input.input(type='text', v-model='influencer.twitter', placeholder='@', )

        .control
          button.button.is-primary().
            Submit
</template>

<script>
import db from '@/db'
import SelectCategory from '@/components/core/SelectCategory'

const booksRef = db.ref('books')
const influencersRef = db.ref('influencers')
const categoriessRef = db.ref('categories')

export default {
  name: 'InfluencersAdd',
  components: {
    SelectCategory,
  },
  data () {
    return {
      countries: [
        { code: 'ABW', name: 'Aruba' },
        { code: 'AFG', name: 'Afghanistan' },
        { code: 'AGO', name: 'Angola' },
        { code: 'AIA', name: 'Anguilla' },
        { code: 'ALB', name: 'Albania' },
        { code: 'AND', name: 'Andorra' },
        { code: 'ANT', name: 'Netherlands Antilles' },
        { code: 'ARE', name: 'United Arab Emirates' },
        { code: 'ARG', name: 'Argentina' },
        { code: 'ARM', name: 'Armenia' },
        { code: 'ASM', name: 'American Samoa' },
        { code: 'ATA', name: 'Antarctica' },
        { code: 'ATF', name: 'French Southern territories' },
        { code: 'ATG', name: 'Antigua and Barbuda' },
        { code: 'AUS', name: 'Australia' },
        { code: 'AUT', name: 'Austria' },
        { code: 'AZE', name: 'Azerbaijan' },
        { code: 'BDI', name: 'Burundi' },
        { code: 'BEL', name: 'Belgium' },
        { code: 'BEN', name: 'Benin' },
        { code: 'BFA', name: 'Burkina Faso' },
        { code: 'BGD', name: 'Bangladesh' },
        { code: 'BGR', name: 'Bulgaria' },
        { code: 'BHR', name: 'Bahrain' },
        { code: 'BHS', name: 'Bahamas' },
        { code: 'BIH', name: 'Bosnia and Herzegovina' },
        { code: 'BLR', name: 'Belarus' },
        { code: 'BLZ', name: 'Belize' },
        { code: 'BMU', name: 'Bermuda' },
        { code: 'BOL', name: 'Bolivia' },
        { code: 'BRA', name: 'Brazil' },
        { code: 'BRB', name: 'Barbados' },
        { code: 'BRN', name: 'Brunei' },
        { code: 'BTN', name: 'Bhutan' },
        { code: 'BVT', name: 'Bouvet Island' },
        { code: 'BWA', name: 'Botswana' },
        { code: 'CAF', name: 'Central African Republic' },
        { code: 'CAN', name: 'Canada' },
        { code: 'CCK', name: 'Cocos (Keeling) Islands' },
        { code: 'CHE', name: 'Switzerland' },
        { code: 'CHL', name: 'Chile' },
        { code: 'CHN', name: 'China' },
        { code: 'CIV', name: 'Côte dIvoire' },
        { code: 'CMR', name: 'Cameroon' },
        { code: 'COD', name: 'Congo, The Democratic Republic of the' },
        { code: 'COG', name: 'Congo' },
        { code: 'COK', name: 'Cook Islands' },
        { code: 'COL', name: 'Colombia' },
        { code: 'COM', name: 'Comoros' },
        { code: 'CPV', name: 'Cape Verde' },
        { code: 'CRI', name: 'Costa Rica' },
        { code: 'CUB', name: 'Cuba' },
        { code: 'CXR', name: 'Christmas Island' },
        { code: 'CYM', name: 'Cayman Islands' },
        { code: 'CYP', name: 'Cyprus' },
        { code: 'CZE', name: 'Czech Republic' },
        { code: 'DEU', name: 'Germany' },
        { code: 'DJI', name: 'Djibouti' },
        { code: 'DMA', name: 'Dominica' },
        { code: 'DNK', name: 'Denmark' },
        { code: 'DOM', name: 'Dominican Republic' },
        { code: 'DZA', name: 'Algeria' },
        { code: 'ECU', name: 'Ecuador' },
        { code: 'EGY', name: 'Egypt' },
        { code: 'ERI', name: 'Eritrea' },
        { code: 'ESH', name: 'Western Sahara' },
        { code: 'ESP', name: 'Spain' },
        { code: 'EST', name: 'Estonia' },
        { code: 'ETH', name: 'Ethiopia' },
        { code: 'FIN', name: 'Finland' },
        { code: 'FJI', name: 'Fiji Islands' },
        { code: 'FLK', name: 'Falkland Islands' },
        { code: 'FRA', name: 'France' },
        { code: 'FRO', name: 'Faroe Islands' },
        { code: 'FSM', name: 'Micronesia, Federated States of' },
        { code: 'GAB', name: 'Gabon' },
        { code: 'GBR', name: 'United Kingdom' },
        { code: 'GEO', name: 'Georgia' },
        { code: 'GHA', name: 'Ghana' },
        { code: 'GIB', name: 'Gibraltar' },
        { code: 'GIN', name: 'Guinea' },
        { code: 'GLP', name: 'Guadeloupe' },
        { code: 'GMB', name: 'Gambia' },
        { code: 'GNB', name: 'Guinea-Bissau' },
        { code: 'GNQ', name: 'Equatorial Guinea' },
        { code: 'GRC', name: 'Greece' },
        { code: 'GRD', name: 'Grenada' },
        { code: 'GRL', name: 'Greenland' },
        { code: 'GTM', name: 'Guatemala' },
        { code: 'GUF', name: 'French Guiana' },
        { code: 'GUM', name: 'Guam' },
        { code: 'GUY', name: 'Guyana' },
        { code: 'HKG', name: 'Hong Kong' },
        { code: 'HMD', name: 'Heard Island and McDonald Islands' },
        { code: 'HND', name: 'Honduras' },
        { code: 'HRV', name: 'Croatia' },
        { code: 'HTI', name: 'Haiti' },
        { code: 'HUN', name: 'Hungary' },
        { code: 'IDN', name: 'Indonesia' },
        { code: 'IND', name: 'India' },
        { code: 'IOT', name: 'British Indian Ocean Territory' },
        { code: 'IRL', name: 'Ireland' },
        { code: 'IRN', name: 'Iran' },
        { code: 'IRQ', name: 'Iraq' },
        { code: 'ISL', name: 'Iceland' },
        { code: 'ISR', name: 'Israel' },
        { code: 'ITA', name: 'Italy' },
        { code: 'JAM', name: 'Jamaica' },
        { code: 'JOR', name: 'Jordan' },
        { code: 'JPN', name: 'Japan' },
        { code: 'KAZ', name: 'Kazakstan' },
        { code: 'KEN', name: 'Kenya' },
        { code: 'KGZ', name: 'Kyrgyzstan' },
        { code: 'KHM', name: 'Cambodia' },
        { code: 'KIR', name: 'Kiribati' },
        { code: 'KNA', name: 'Saint Kitts and Nevis' },
        { code: 'KOR', name: 'South Korea' },
        { code: 'KWT', name: 'Kuwait' },
        { code: 'LAO', name: 'Laos' },
        { code: 'LBN', name: 'Lebanon' },
        { code: 'LBR', name: 'Liberia' },
        { code: 'LBY', name: 'Libyan Arab Jamahiriya' },
        { code: 'LCA', name: 'Saint Lucia' },
        { code: 'LIE', name: 'Liechtenstein' },
        { code: 'LKA', name: 'Sri Lanka' },
        { code: 'LSO', name: 'Lesotho' },
        { code: 'LTU', name: 'Lithuania' },
        { code: 'LUX', name: 'Luxembourg' },
        { code: 'LVA', name: 'Latvia' },
        { code: 'MAC', name: 'Macao' },
        { code: 'MAR', name: 'Morocco' },
        { code: 'MCO', name: 'Monaco' },
        { code: 'MDA', name: 'Moldova' },
        { code: 'MDG', name: 'Madagascar' },
        { code: 'MDV', name: 'Maldives' },
        { code: 'MEX', name: 'Mexico' },
        { code: 'MHL', name: 'Marshall Islands' },
        { code: 'MKD', name: 'Macedonia' },
        { code: 'MLI', name: 'Mali' },
        { code: 'MLT', name: 'Malta' },
        { code: 'MMR', name: 'Myanmar' },
        { code: 'MNG', name: 'Mongolia' },
        { code: 'MNP', name: 'Northern Mariana Islands' },
        { code: 'MOZ', name: 'Mozambique' },
        { code: 'MRT', name: 'Mauritania' },
        { code: 'MSR', name: 'Montserrat' },
        { code: 'MTQ', name: 'Martinique' },
        { code: 'MUS', name: 'Mauritius' },
        { code: 'MWI', name: 'Malawi' },
        { code: 'MYS', name: 'Malaysia' },
        { code: 'MYT', name: 'Mayotte' },
        { code: 'NAM', name: 'Namibia' },
        { code: 'NCL', name: 'New Caledonia' },
        { code: 'NER', name: 'Niger' },
        { code: 'NFK', name: 'Norfolk Island' },
        { code: 'NGA', name: 'Nigeria' },
        { code: 'NIC', name: 'Nicaragua' },
        { code: 'NIU', name: 'Niue' },
        { code: 'NLD', name: 'Netherlands' },
        { code: 'NOR', name: 'Norway' },
        { code: 'NPL', name: 'Nepal' },
        { code: 'NRU', name: 'Nauru' },
        { code: 'NZL', name: 'New Zealand' },
        { code: 'OMN', name: 'Oman' },
        { code: 'PAK', name: 'Pakistan' },
        { code: 'PAN', name: 'Panama' },
        { code: 'PCN', name: 'Pitcairn' },
        { code: 'PER', name: 'Peru' },
        { code: 'PHL', name: 'Philippines' },
        { code: 'PLW', name: 'Palau' },
        { code: 'PNG', name: 'Papua New Guinea' },
        { code: 'POL', name: 'Poland' },
        { code: 'PRI', name: 'Puerto Rico' },
        { code: 'PRK', name: 'North Korea' },
        { code: 'PRT', name: 'Portugal' },
        { code: 'PRY', name: 'Paraguay' },
        { code: 'PSE', name: 'Palestine' },
        { code: 'PYF', name: 'French Polynesia' },
        { code: 'QAT', name: 'Qatar' },
        { code: 'REU', name: 'Réunion' },
        { code: 'ROM', name: 'Romania' },
        { code: 'RUS', name: 'Russian Federation' },
        { code: 'RWA', name: 'Rwanda' },
        { code: 'SAU', name: 'Saudi Arabia' },
        { code: 'SDN', name: 'Sudan' },
        { code: 'SEN', name: 'Senegal' },
        { code: 'SGP', name: 'Singapore' },
        { code: 'SGS', name: 'South Georgia and the South Sandwich Islands' },
        { code: 'SHN', name: 'Saint Helena' },
        { code: 'SJM', name: 'Svalbard and Jan Mayen' },
        { code: 'SLB', name: 'Solomon Islands' },
        { code: 'SLE', name: 'Sierra Leone' },
        { code: 'SLV', name: 'El Salvador' },
        { code: 'SMR', name: 'San Marino' },
        { code: 'SOM', name: 'Somalia' },
        { code: 'SPM', name: 'Saint Pierre and Miquelon' },
        { code: 'SRB', name: 'Serbia' },
        { code: 'STP', name: 'Sao Tome and Principe' },
        { code: 'SUR', name: 'Suriname' },
        { code: 'SVK', name: 'Slovakia' },
        { code: 'SVN', name: 'Slovenia' },
        { code: 'SWE', name: 'Sweden' },
        { code: 'SWZ', name: 'Swaziland' },
        { code: 'SYC', name: 'Seychelles' },
        { code: 'SYR', name: 'Syria' },
        { code: 'TCA', name: 'Turks and Caicos Islands' },
        { code: 'TCD', name: 'Chad' },
        { code: 'TGO', name: 'Togo' },
        { code: 'THA', name: 'Thailand' },
        { code: 'TJK', name: 'Tajikistan' },
        { code: 'TKL', name: 'Tokelau' },
        { code: 'TKM', name: 'Turkmenistan' },
        { code: 'TMP', name: 'East Timor' },
        { code: 'TON', name: 'Tonga' },
        { code: 'TTO', name: 'Trinidad and Tobago' },
        { code: 'TUN', name: 'Tunisia' },
        { code: 'TUR', name: 'Turkey' },
        { code: 'TUV', name: 'Tuvalu' },
        { code: 'TWN', name: 'Taiwan' },
        { code: 'TZA', name: 'Tanzania' },
        { code: 'UGA', name: 'Uganda' },
        { code: 'UKR', name: 'Ukraine' },
        { code: 'UMI', name: 'United States Minor Outlying Islands' },
        { code: 'URY', name: 'Uruguay' },
        { code: 'USA', name: 'United States' },
        { code: 'UZB', name: 'Uzbekistan' },
        { code: 'VAT', name: 'Holy See (Vatican City State)' },
        { code: 'VCT', name: 'Saint Vincent and the Grenadines' },
        { code: 'VEN', name: 'Venezuela' },
        { code: 'VGB', name: 'Virgin Islands, British' },
        { code: 'VIR', name: 'Virgin Islands, U.S.' },
        { code: 'VNM', name: 'Vietnam' },
        { code: 'VUT', name: 'Vanuatu' },
        { code: 'WLF', name: 'Wallis and Futuna' },
        { code: 'WSM', name: 'Samoa' },
        { code: 'YEM', name: 'Yemen' },
        { code: 'YUG', name: 'Yugoslavia' },
        { code: 'ZAF', name: 'South Africa' },
        { code: 'ZMB', name: 'Zambia' },
        { code: 'ZWE', name: 'Zimbabwe' },
      ],
      influencer: {
        name: '',
        instagram: '',
        country: '',
        category1: '',
        category2: '',
        facebook: '',
        twitter: '',
      },
      newBook: {
        title: '',
        author: '',
        url: 'http://',
      },
    }
  },
  firebase: {
    books: db.ref('books'),
    influencers: db.ref('influencers'),
    categories: categoriessRef,
  },
  methods: {
    addBook: function () {
      booksRef.push(this.newBook)
      this.newBook.title = ''
      this.newBook.author = ''
      this.newBook.url = 'http://'
    },
    addInfluencer: function () {
      influencersRef.push(this.influencer)
    },
  },
}
</script>

<style lang="stylus">
// .InfluencersAdd
</style>
