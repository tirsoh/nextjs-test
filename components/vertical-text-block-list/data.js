const data = [
  {
    logo: {
      url:
        'https://www.datocms-assets.com/2885/1536611731-meganav-terraform.svg',
      alt: 'Terraform Logo'
    },
    header: 'This is a test header',
    body: 'This is some body text to display',
    link_url: 'https://learn.hashicorp.com/terraform'
  },
  {
    header: 'This is another test header',
    body: 'This is some [body text](http://www.google.com) to display'
  },
  {
    logo: {
      url: 'https://www.datocms-assets.com/2885/1536611729-meganav-nomad.svg',
      alt: 'Nomad Logo'
    },
    header: 'Yup, still a test header',
    body:
      'This is some body text to display. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut **arcu justo**, et convallis lectus. Sed commodo massa eget risus [feugiat suscipit](https://www.hashicorp.com). Nulla velit lectus, imperdiet cursus tempor at, adipiscing sit amet nisi. Aliquam vitae egestas erat. Aliquam erat volutpat. Aliquam iaculis facilisis elit, sed vulputate sem cursus ut. Morbi elit lacus, varius at porttitor nec, gravida in sapien. Aliquam erat volutpat. Nulla ut lorem libero, in lacinia velit.',
    link_url: 'https://learn.hashicorp.com/nomad'
  },
  {
    header: 'This is a longer header that wraps',
    body:
      'This is some [body text](http://www.google.com) to display with some additional text to see how it handles it.'
  },
  {
    logo: {
      url: 'https://www.datocms-assets.com/2885/1537300245-terraform-color.svg',
      alt: 'Terraform Logo'
    },
    header: 'Ok, last test header',
    body: 'This is some body text to display'
  }
]

export default data
