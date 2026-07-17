// Atlas Copco Group header - using official Design System
export default async function decorate(block) {
  block.innerHTML = `
    <nav class="ac-header" aria-label="Main navigation">
      <div class="ac-header-inner">
        <a href="/" class="ac-logo" aria-label="Atlas Copco Group Home">
          <img src="https://atlascopco.scene7.com/is/image/atlascopco/Atlas+Copco+Group+logo+header?fmt=png-alpha&wid=200" alt="Atlas Copco Group" height="40">
        </a>
        <ul class="ac-nav-links">
          <li><a href="/en/about-us">About us</a></li>
          <li><a href="/en/sustainability">Sustainability</a></li>
          <li><a href="/en/careers">Careers</a></li>
          <li><a href="/en/media">Media</a></li>
          <li><a href="/en/investors" class="ac-nav-active">Investors</a></li>
          <li><a href="/en/innovation">Innovation</a></li>
        </ul>
        <div class="ac-header-actions">
          <a href="/en/locations" class="ac-header-action">LOCATIONS</a>
          <a href="/en" class="ac-header-action">ENGLISH</a>
          <button class="ac-header-icon" aria-label="Select language">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          </button>
          <button class="ac-header-icon" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </button>
        </div>
      </div>
    </nav>
  `;
}
