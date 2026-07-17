export default async function decorate(block) {
  block.innerHTML = `
    <div class="ds-brand-footer">
      <div class="ds-brand-footer__main">
        <div class="ds-brand-footer__main-inner">
          <div class="ds-brand-footer__content">
            <div class="ds-brand-footer-contact">
              <div class="ds-brand-footer-contact__inner">
                <img src="https://atlascopco.scene7.com/is/image/atlascopco/Atlas+Copco+Group+logo+header?fmt=png-alpha&wid=164" alt="Atlas Copco Group" class="ds-brand-footer__logo">
                <div class="ds-brand-footer__address">
                  <p><strong>Atlas Copco AB</strong></p>
                  <p>Sickla Industriv&auml;g 19</p>
                  <p>SE-105 23 Nacka/Stockholm</p>
                  <p>Sweden</p>
                </div>
                <div class="ds-brand-footer__contact-links">
                  <a href="tel:+4687438000">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                    +46 (0)8 743 80 00
                  </a>
                  <a href="mailto:info@atlascopco.com">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>
                    info@atlascopco.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="ds-brand-footer__navigation">
            <div class="ds-brand-footer__navigation-col">
              <h5>Atlas Copco Group</h5>
              <ul>
                <li><a href="/en/about-us">About us</a></li>
                <li><a href="/en/sustainability">Sustainability</a></li>
                <li><a href="/en/careers">Careers</a></li>
                <li><a href="/en/media">Media</a></li>
                <li><a href="/en/investors">Investors</a></li>
                <li><a href="/en/innovation">Innovation</a></li>
              </ul>
            </div>
            <div class="ds-brand-footer__navigation-col">
              <h5>Quick links</h5>
              <ul>
                <li><a href="#">How we do business</a></li>
                <li><a href="#">Brands</a></li>
                <li><a href="#">Reports and presentations</a></li>
              </ul>
            </div>
            <div class="ds-brand-footer__navigation-col">
              <h5>About us</h5>
              <p>Atlas Copco Group develops innovative solutions across business areas including air compression, vacuum, industrial, and power techniques. With a global portfolio of 80+ brands, we enable technology that transforms the future.</p>
              <div class="ds-brand-footer__social">
                <a href="https://www.facebook.com/AtlasCopcoGroup/" aria-label="Facebook"><svg width="20" height="20" viewBox="0 0 20 20" fill="white"><path d="M8.125 7.5H6.25V10H8.125V17.5H11.25V10H13.526L13.75 7.5H11.25V6.458C11.25 5.861 11.37 5.625 11.947 5.625H13.75V2.5H11.37C9.122 2.5 8.125 3.489 8.125 5.384V7.5Z"/></svg></a>
                <a href="https://www.linkedin.com/company/atlas-copco-group" aria-label="LinkedIn"><svg width="20" height="20" viewBox="0 0 20 20" fill="white"><path d="M5.612 4.062C5.612 4.925 4.919 5.625 4.062 5.625C3.206 5.625 2.512 4.925 2.512 4.062C2.512 3.2 3.206 2.5 4.062 2.5C4.919 2.5 5.612 3.2 5.612 4.062ZM5.625 6.875H2.5V16.875H5.625V6.875ZM10.614 6.875H7.509V16.875H10.614V11.626C10.614 8.707 14.382 8.468 14.382 11.626V16.875H17.5V10.543C17.5 5.618 11.924 5.797 10.614 8.222V6.875Z"/></svg></a>
                <a href="https://www.instagram.com/atlascopcogroup/" aria-label="Instagram"><svg width="20" height="20" viewBox="0 0 20 20" fill="white"><path d="M14 6.896A.907.907 0 1014 5.096a.907.907 0 000 1.8z"/><path fill-rule="evenodd" d="M10 6.149a3.851 3.851 0 100 7.702 3.851 3.851 0 000-7.702zM10 12.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/><path fill-rule="evenodd" d="M6.908 2.545C7.708 2.509 7.963 2.5 10 2.5s2.292.009 3.092.045c.622.013 1.238.13 1.82.349a4.86 4.86 0 012.789 2.789c.219.582.336 1.198.349 1.82.037.8.045 1.055.045 3.092s-.008 2.292-.045 3.092a5.293 5.293 0 01-.349 1.82 4.86 4.86 0 01-2.789 2.789 5.293 5.293 0 01-1.82.349c-.8.036-1.055.045-3.092.045s-2.292-.009-3.092-.045a5.293 5.293 0 01-1.82-.349 4.86 4.86 0 01-2.789-2.789 5.293 5.293 0 01-.349-1.82C1.914 12.292 1.905 12.037 1.905 10s.009-2.292.045-3.092c.013-.622.13-1.238.349-1.82A4.86 4.86 0 015.088 2.3c.582-.219 1.198-.336 1.82-.349zM13.008 4.041c-.764-.033-1.006-.041-2.963-.041h-.09c-1.957 0-2.199.008-2.963.041a3.798 3.798 0 00-1.296.247 2.36 2.36 0 00-1.407 1.407 3.798 3.798 0 00-.247 1.296C4.009 7.755 4 7.997 4 10s.009 2.245.042 3.009c.022.44.112.874.247 1.296a2.36 2.36 0 001.407 1.407c.422.135.856.225 1.296.247.764.033 1.006.041 2.963.041h.09c1.957 0 2.199-.008 2.963-.041a3.798 3.798 0 001.296-.247 2.36 2.36 0 001.407-1.407c.135-.422.225-.856.247-1.296.033-.764.042-1.006.042-3.009s-.009-2.245-.042-3.009a3.798 3.798 0 00-.247-1.296 2.36 2.36 0 00-1.407-1.407 3.798 3.798 0 00-1.296-.247z"/></svg></a>
                <a href="https://www.youtube.com/user/AtlasCopcoGroup" aria-label="YouTube"><svg width="20" height="20" viewBox="0 0 20 20" fill="white"><path d="M18.382 5.788a2.78 2.78 0 00-1.94-2C14.88 3.875 10 3.875 10 3.875s-4.88 0-6.442.463a2.78 2.78 0 00-1.94 2A29 29 0 001.25 10a29 29 0 00.368 4.212 2.78 2.78 0 001.94 2C5.12 16.125 10 16.125 10 16.125s4.88 0 6.442-.463a2.78 2.78 0 001.94-2A29 29 0 0018.75 10a29 29 0 00-.368-4.212zM8.25 12.625V7.375L12.794 10 8.25 12.625z"/></svg></a>
                <a href="https://twitter.com/atlascopcogroup" aria-label="X"><svg width="20" height="20" viewBox="0 0 20 20" fill="white"><path d="M10.988 9.081L15.359 4H14.323L10.528 8.412 7.496 4H4L8.584 10.672 4 16H5.036L9.044 11.341 12.246 16H15.742L10.988 9.081zM9.569 10.73L9.105 10.066 5.409 4.78H7L9.983 9.046 10.447 9.71 14.324 15.256H12.733L9.569 10.731z"/></svg></a>
                <a href="#" class="ds-brand-footer__back-to-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Back to top"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m18 15-6-6-6 6"/><path d="m18 9-6-6-6 6"/></svg></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ds-brand-footer__bottom">
        <div class="ds-brand-footer__bottom-inner">
          <p>&copy; Copyright 2026 - Atlas Copco Group</p>
          <div class="ds-brand-footer__bottom-nav">
            <a href="/en/privacy">Legal and Privacy Notices</a>
            <span>Manage cookies</span>
            <a href="/en/accessibility">Accessibility</a>
          </div>
        </div>
      </div>
    </div>
  `;
}
