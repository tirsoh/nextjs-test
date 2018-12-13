import { Component } from 'react'
import { ChildProps, graphql } from 'react-apollo'
import { Nav as INav } from '../../types/models'
import DropdownLink from './DropdownLink'
import getNavQuery from './getNav.graphql'
import HoverSwapImg from './HoverSwapImg'
import './style.css'

interface NavState {
  mobileMenuActive: boolean
}

class Nav extends Component<ChildProps<{}, INav>, NavState> {
  constructor(props: ChildProps<{}, INav>) {
    super(props)

    this.state = { mobileMenuActive: false }

    this.toggleMobileMenu = this.toggleMobileMenu.bind(this)
    this.enterMobileSubnav = this.enterMobileSubnav.bind(this)
    this.exitMobileSubnav = this.exitMobileSubnav.bind(this)
  }

  public render() {
    const { globalNavigation } = this.props.data

    return (
      <div className="g-nav">
        <div className="g-container">
          <div className="mobile">
            <a href="https://www.hashicorp.com">
              <img
                className="logo"
                src={globalNavigation.primaryLogo.url}
                alt={globalNavigation.primaryLogo.alt}
              />
            </a>
            <div
              className={`burger${
                this.state.mobileMenuActive ? ' active' : ''
              }`}
              onClick={this.toggleMobileMenu}
            >
              <span />
              <span />
              <span />
              <span />
            </div>
            <div
              className={`overlay${
                this.state.mobileMenuActive ? ' active' : ''
              }`}
            />
          </div>
          <ul
            className={`links${this.state.mobileMenuActive ? ' active' : ''}`}
          >
            <li className="logo">
              <a href="https://www.hashicorp.com/">
                <img
                  className="logo"
                  src={globalNavigation.primaryLogo.url}
                  alt={globalNavigation.primaryLogo.alt}
                />
              </a>
            </li>
            {/* Enterprise Products Dropdown */}
            <DropdownLink
              name="Products"
              enter={this.enterMobileSubnav}
              exit={this.exitMobileSubnav}
              lockup={globalNavigation.productsImageLockup}
            >
              {globalNavigation.enterpriseProducts.map(item => {
                return (
                  <li key={item.name} className={item.slug}>
                    <a
                      data-ga-header={`Products | ${item.name}`}
                      href={`https://www.hashicorp.com/products/${item.slug}`}
                    >
                      <span className="keyword">{item.subtitle}</span>
                      <div className="title">
                        <HoverSwapImg
                          data={{
                            icon: item.logoDark,
                            lightIcon: item.logo
                          }}
                        />
                        <span>{item.name.split(' ')[0]}</span>
                      </div>
                    </a>
                  </li>
                )
              })}
            </DropdownLink>
            {/* Learn Dropdown */}
            <DropdownLink
              name="Learn"
              enter={this.enterMobileSubnav}
              exit={this.exitMobileSubnav}
              lockup={globalNavigation.resourcesImageLockup}
            >
              {globalNavigation.resourceLinks.map(item => {
                return (
                  <li key={item.title}>
                    <a
                      data-ga-header={`Learn | ${item.title}`}
                      href={`${item.url}`}
                    >
                      <div className="title">
                        <HoverSwapImg data={item} />
                        {item.title}
                      </div>
                    </a>
                  </li>
                )
              })}
            </DropdownLink>
            {/* Company Dropdown */}
            <DropdownLink
              name="Company"
              enter={this.enterMobileSubnav}
              exit={this.exitMobileSubnav}
              lockup={globalNavigation.companyImageLockup}
            >
              {globalNavigation.companyLinks.map(item => {
                return (
                  <li key={item.title}>
                    <a
                      data-ga-header={`Company | ${item.title}`}
                      href={item.url}
                    >
                      <div className="title">
                        <HoverSwapImg data={item} />
                        {item.title}
                      </div>
                    </a>
                  </li>
                )
              })}
            </DropdownLink>
            {/* Partners Dropdown */}
            <DropdownLink
              name="Partners"
              enter={this.enterMobileSubnav}
              exit={this.exitMobileSubnav}
              lockup={globalNavigation.partnerImageLockup}
            >
              {globalNavigation.partnerLinks.map(item => {
                return (
                  <li key={item.url}>
                    <a href={item.url}>
                      <div className="title">
                        <HoverSwapImg data={item} />
                        {item.title}
                      </div>
                    </a>
                  </li>
                )
              })}
            </DropdownLink>
            {/* Docs Dropdown */}
            <DropdownLink
              name="Docs"
              enter={this.enterMobileSubnav}
              exit={this.exitMobileSubnav}
              lockup={globalNavigation.openSourceImageLockup}
            >
              {globalNavigation.openSourceTools.map(item => {
                return (
                  <li key={item.name}>
                    <a
                      data-ga-header={`Open Source | ${item.name}`}
                      href={item.website}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <div className="title">
                        <HoverSwapImg
                          data={{
                            icon: item.logo,
                            lightIcon: item.logoLight
                          }}
                        />
                        {item.name}
                      </div>
                      <span className="description">{item.description}</span>
                    </a>
                  </li>
                )
              })}
            </DropdownLink>
            {/* Normal Links */}
            {globalNavigation.navigationLinks.map(item => {
              return (
                <li key={item.title} className="no-dropdown">
                  <a data-ga-header={item.title} href={item.url}>
                    {item.title}
                  </a>
                </li>
              )
            })}
            <li className="button">
              <a href={globalNavigation.ctaButton.url}>
                {globalNavigation.ctaButton.title}
                <i />
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  public toggleMobileMenu() {
    this.setState({ mobileMenuActive: !this.state.mobileMenuActive })
    document.body.classList.toggle('g-noscroll')
  }

  public enterMobileSubnav(e: React.MouseEvent<HTMLElement>) {
    if (window.matchMedia('(max-width: 1000px)').matches) {
      const submenu = e.currentTarget.nextElementSibling
      submenu.classList.add('active')
    }
  }

  public exitMobileSubnav() {
    const submenus = document.querySelectorAll('nav .submenu.active')
    submenus.forEach(menu => {
      menu.classList.remove('active')
    })
  }
}

const NavWithData = graphql<{}, INav>(getNavQuery)(Nav)

export default NavWithData
