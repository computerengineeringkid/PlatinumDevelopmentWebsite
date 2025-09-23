import { sanityClient, urlForImage } from './sanityClient.js';

const sections = {
  hero: document.querySelector('[data-section="hero"]'),
  about: document.querySelector('[data-section="about"]'),
  portfolio: document.querySelector('[data-section="portfolio"]'),
  contact: document.querySelector('[data-section="contact"]')
};

function toPlainText(value) {
  if (!value) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value)) {
    return value
      .map((block) => {
        if (typeof block === 'string') {
          return block;
        }

        if (block && Array.isArray(block.children)) {
          return block.children
            .map((child) => (child && child.text ? child.text : ''))
            .join('');
        }

        return '';
      })
      .filter(Boolean)
      .join('\n\n');
  }

  if (typeof value === 'object') {
    return Object.values(value)
      .map((entry) => toPlainText(entry))
      .filter(Boolean)
      .join('\n');
  }

  return '';
}

function addFadeIn(element) {
  if (element) {
    element.classList.add('fade-in-section');
  }
}

function renderHero(data) {
  const heroSection = sections.hero;
  if (!heroSection) {
    return;
  }

  heroSection.innerHTML = '';
  const imageUrl = data && data.backgroundImage ? urlForImage(data.backgroundImage)?.width(2000).url() : null;
  const backgroundImage = imageUrl || 'vegas2.jpg';
  heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${backgroundImage}")`;

  const overlay = document.createElement('div');
  overlay.className = 'absolute inset-0 bg-black/60';
  heroSection.appendChild(overlay);

  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'relative text-center px-4';
  addFadeIn(contentWrapper);

  const title = document.createElement('h1');
  title.className = 'text-4xl md:text-6xl font-bold leading-tight mb-4';
  title.textContent = data?.title || data?.heading || 'Platinum Development';
  contentWrapper.appendChild(title);

  const subtitleText = data?.subtitle || data?.tagline || toPlainText(data?.description) || toPlainText(data?.body);
  const subtitle = document.createElement('p');
  subtitle.className = 'text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto';
  subtitle.textContent = subtitleText || 'Dynamic content is coming soon.';
  contentWrapper.appendChild(subtitle);

  const ctaText = data?.ctaText || data?.ctaLabel || 'Explore Projects';
  const ctaUrl = data?.ctaUrl || data?.ctaHref || '#portfolio';
  const cta = document.createElement('a');
  cta.href = ctaUrl;
  cta.className = 'inline-block bg-white text-gray-800 font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-200 transition-transform transform hover:scale-105';
  cta.textContent = ctaText;
  contentWrapper.appendChild(cta);

  heroSection.appendChild(contentWrapper);
}

function renderAbout(data) {
  const aboutContainer = sections.about;
  if (!aboutContainer) {
    return;
  }

  aboutContainer.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'grid md:grid-cols-2 gap-12 items-center';
  addFadeIn(wrapper);

  const imageSource = data?.image || data?.heroImage || data?.media;
  if (imageSource) {
    const imageWrapper = document.createElement('div');
    const img = document.createElement('img');
    img.className = 'rounded-lg shadow-xl w-full object-cover';
    img.alt = data?.imageAlt || 'Company overview';
    img.src = urlForImage(imageSource)?.width(800).height(600).url() || 'https://placehold.co/600x400/EFEFEF/333?text=Coming+Soon';
    imageWrapper.appendChild(img);
    wrapper.appendChild(imageWrapper);
  }

  const textWrapper = document.createElement('div');
  const heading = document.createElement('h2');
  heading.className = 'text-3xl font-bold mb-4';
  heading.textContent = data?.title || data?.heading || 'About Platinum Development';
  textWrapper.appendChild(heading);

  const bodyCopy = [data?.subtitle, data?.body, data?.description, data?.details]
    .map((entry) => toPlainText(entry))
    .filter(Boolean);

  if (bodyCopy.length === 0) {
    bodyCopy.push('Content managed from Sanity will appear here once available.');
  }

  bodyCopy.forEach((paragraph, index) => {
    const p = document.createElement('p');
    p.className = 'text-gray-600';
    if (index < bodyCopy.length - 1) {
      p.classList.add('mb-4');
    }
    p.textContent = paragraph;
    textWrapper.appendChild(p);
  });

  wrapper.appendChild(textWrapper);
  aboutContainer.appendChild(wrapper);
}

function createProjectCard(project, index) {
  const card = document.createElement('article');
  card.className = 'bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300';
  addFadeIn(card);
  card.style.transitionDelay = `${index * 75}ms`;

  const imageWrapper = document.createElement('div');
  const imageSource = project?.image || project?.media;
  if (imageSource) {
    const img = document.createElement('img');
    img.className = 'w-full h-56 object-cover';
    img.alt = project?.title || project?.name || 'Project image';
    img.src = urlForImage(imageSource)?.width(600).height(400).url() || 'https://placehold.co/600x400/2D3748/FFFFFF?text=Project';
    imageWrapper.appendChild(img);
  } else {
    imageWrapper.className = 'w-full h-56 bg-gray-200 flex items-center justify-center text-gray-500';
    const placeholder = document.createElement('span');
    placeholder.textContent = 'Image coming soon';
    imageWrapper.appendChild(placeholder);
  }
  card.appendChild(imageWrapper);

  const content = document.createElement('div');
  content.className = 'p-6';

  const title = document.createElement('h3');
  title.className = 'text-xl font-semibold mb-2';
  title.textContent = project?.title || project?.name || 'Untitled Project';
  content.appendChild(title);

  const location = toPlainText(project?.location);
  if (location) {
    const locationEl = document.createElement('p');
    locationEl.className = 'text-sm uppercase tracking-wide text-gray-400 mb-1';
    locationEl.textContent = location;
    content.appendChild(locationEl);
  }

  const summary = toPlainText(project?.summary) || toPlainText(project?.description) || 'Project details coming soon.';
  const summaryEl = document.createElement('p');
  summaryEl.className = 'text-gray-600';
  summaryEl.textContent = summary;
  content.appendChild(summaryEl);

  card.appendChild(content);
  return card;
}

function renderPortfolio(data) {
  const portfolioContainer = sections.portfolio;
  if (!portfolioContainer) {
    return;
  }

  portfolioContainer.innerHTML = '';

  const header = document.createElement('div');
  header.className = 'text-center mb-12';
  addFadeIn(header);

  const heading = document.createElement('h2');
  heading.className = 'text-3xl font-bold';
  heading.textContent = data?.title || data?.heading || 'Our Portfolio';
  header.appendChild(heading);

  const subheadingText = data?.subtitle || toPlainText(data?.description) || 'A selection of projects curated in Sanity.';
  const subheading = document.createElement('p');
  subheading.className = 'text-gray-600 mt-2';
  subheading.textContent = subheadingText;
  header.appendChild(subheading);

  portfolioContainer.appendChild(header);

  const projectsWrapper = document.createElement('div');
  projectsWrapper.className = 'grid md:grid-cols-2 lg:grid-cols-3 gap-8';

  const projects = Array.isArray(data?.projects) ? data.projects : [];

  if (projects.length === 0) {
    const placeholder = document.createElement('p');
    placeholder.className = 'text-center text-gray-500';
    placeholder.textContent = 'Portfolio entries will appear here once they are published in Sanity.';
    projectsWrapper.appendChild(placeholder);
  } else {
    projects.forEach((project, index) => {
      projectsWrapper.appendChild(createProjectCard(project, index));
    });
  }

  portfolioContainer.appendChild(projectsWrapper);
}

function renderContact(data) {
  const contactContainer = sections.contact;
  if (!contactContainer) {
    return;
  }

  contactContainer.innerHTML = '';

  const header = document.createElement('div');
  header.className = 'text-center mb-12';
  addFadeIn(header);

  const heading = document.createElement('h2');
  heading.className = 'text-3xl font-bold';
  heading.textContent = data?.title || data?.heading || 'Contact Us';
  header.appendChild(heading);

  const subtitleText = data?.subtitle || toPlainText(data?.description) || "Let's build something great together.";
  const subtitle = document.createElement('p');
  subtitle.className = 'text-gray-600 mt-2';
  subtitle.textContent = subtitleText;
  header.appendChild(subtitle);

  contactContainer.appendChild(header);

  const grid = document.createElement('div');
  grid.className = 'grid md:grid-cols-2 gap-12 items-start';
  addFadeIn(grid);

  const form = document.createElement('form');
  form.className = 'space-y-6';
  form.noValidate = true;
  form.innerHTML = `
    <div class="grid sm:grid-cols-2 gap-6">
      <div>
        <label for="first-name" class="block text-sm font-medium text-gray-700">First Name</label>
        <input type="text" id="first-name" name="firstName" class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500" required>
      </div>
      <div>
        <label for="last-name" class="block text-sm font-medium text-gray-700">Last Name</label>
        <input type="text" id="last-name" name="lastName" class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500" required>
      </div>
    </div>
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
      <input type="email" id="email" name="email" class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500" required>
    </div>
    <div>
      <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
      <textarea id="message" name="message" rows="4" class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500" required></textarea>
    </div>
    <div>
      <button type="submit" class="w-full bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors">Send Message</button>
    </div>
  `;

  const detailsWrapper = document.createElement('div');
  detailsWrapper.className = 'space-y-6';

  const infoCard = document.createElement('div');
  infoCard.className = 'bg-gray-50 p-6 rounded-lg';

  const infoHeading = document.createElement('h3');
  infoHeading.className = 'text-xl font-semibold mb-4';
  infoHeading.textContent = data?.infoTitle || 'Our Information';
  infoCard.appendChild(infoHeading);

  const contactDetails = [
    { label: 'Email', value: data?.email },
    { label: 'Phone', value: data?.phone },
    { label: 'Address', value: toPlainText(data?.address) },
    { label: 'Hours', value: toPlainText(data?.hours) }
  ].filter((entry) => entry.value);

  if (contactDetails.length === 0) {
    contactDetails.push({ label: 'Email', value: 'info@example.com' });
  }

  contactDetails.forEach((entry) => {
    const paragraph = document.createElement('p');
    paragraph.className = 'text-gray-600 mb-2 last:mb-0';

    const label = document.createElement('strong');
    label.textContent = `${entry.label}:`;
    paragraph.appendChild(label);

    paragraph.appendChild(document.createElement('br'));
    paragraph.append(entry.value);

    infoCard.appendChild(paragraph);
  });

  detailsWrapper.appendChild(infoCard);

  const mapCard = document.createElement('div');
  const mapUrl = data?.mapUrl;
  const mapImage = data?.mapImage;
  const mapLabel = data?.mapLabel || 'Map Placeholder';

  if (mapUrl) {
    mapCard.className = 'aspect-video rounded-lg overflow-hidden shadow-inner';
    const iframe = document.createElement('iframe');
    iframe.src = mapUrl;
    iframe.title = data?.mapTitle || 'Map';
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.className = 'w-full h-full border-0';
    mapCard.appendChild(iframe);
  } else if (mapImage) {
    mapCard.className = 'rounded-lg overflow-hidden shadow-inner';
    const img = document.createElement('img');
    img.src = urlForImage(mapImage)?.width(800).height(600).url() || 'https://placehold.co/600x400/DDD/333?text=Map';
    img.alt = data?.mapTitle || 'Map';
    img.className = 'w-full h-full object-cover';
    mapCard.appendChild(img);
  } else {
    mapCard.className = 'bg-gray-200 h-64 rounded-lg flex items-center justify-center text-gray-500';
    mapCard.textContent = mapLabel;
  }

  detailsWrapper.appendChild(mapCard);

  grid.appendChild(form);
  grid.appendChild(detailsWrapper);

  contactContainer.appendChild(grid);
}

const HERO_QUERY = '*[_type in ["hero", "heroSection", "landingHero"]][0]{title, heading, subtitle, tagline, description, body, ctaText, ctaLabel, ctaUrl, ctaHref, backgroundImage}';
const ABOUT_QUERY = '*[_type in ["about", "aboutSection", "companyOverview"]][0]{title, heading, subtitle, body, description, details, image, heroImage, media, imageAlt}';
const PORTFOLIO_QUERY = '*[_type in ["portfolio", "portfolioSection", "projectGallery"]][0]{title, heading, subtitle, description, projects[]{_key, title, name, location, summary, description, image, media}}';
const CONTACT_QUERY = '*[_type in ["contact", "contactSection", "contactInfo"]][0]{title, heading, subtitle, description, email, phone, address, hours, infoTitle, mapUrl, mapImage, mapLabel, mapTitle}';

async function fetchContent() {
  if (!sanityClient) {
    renderHero();
    renderAbout();
    renderPortfolio();
    renderContact();
    return;
  }

  try {
    const [hero, about, portfolio, contact] = await Promise.all([
      sanityClient.fetch(HERO_QUERY).catch((error) => {
        console.error('Failed to fetch hero content from Sanity:', error);
        return null;
      }),
      sanityClient.fetch(ABOUT_QUERY).catch((error) => {
        console.error('Failed to fetch about content from Sanity:', error);
        return null;
      }),
      sanityClient.fetch(PORTFOLIO_QUERY).catch((error) => {
        console.error('Failed to fetch portfolio content from Sanity:', error);
        return null;
      }),
      sanityClient.fetch(CONTACT_QUERY).catch((error) => {
        console.error('Failed to fetch contact content from Sanity:', error);
        return null;
      })
    ]);

    renderHero(hero || {});
    renderAbout(about || {});
    renderPortfolio(portfolio || {});
    renderContact(contact || {});
  } catch (error) {
    console.error('Unexpected error loading Sanity content:', error);
    renderHero();
    renderAbout();
    renderPortfolio();
    renderContact();
  }
}

fetchContent();
