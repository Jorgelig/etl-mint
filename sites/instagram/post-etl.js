const debug = require('debug')('app:post-etl');

const extract = require('../../utils/extract');
const { waiter } = require('../../utils/fetch');
const { getData } = require('./post-extract');

function getLocation(postLocation) {
  if (!postLocation) {
    return null;
  }

  const address = postLocation.address_json ? JSON.parse(postLocation.address_json) : null;

  const location = {
    id: postLocation.id,
    name: postLocation.name,
    slug: postLocation.slug,
  };

  if (address) {
    location.address = {
      street: address.street_address,
      zipCode: address.zip_code,
      city: address.city_name,
      country: address.country_code,
    };
  }

  return location;
}

function transform(html) {
  const data = getData(html);

  if (!data.shortcode_media) {
    debug(data);
    return null;
  }

  const {
    location, owner, display_url,
  } = data.shortcode_media;

  const response = {
    mediaUrl: display_url,
    user: {
      id: owner.id,
      username: owner.username,
      fullName: owner.full_name,
      profilePicture: owner.profile_pic_url,
    },
  };

  if (owner.edge_followed_by && owner.edge_followed_by.count) {
    response.user.followedBy = owner.edge_followed_by.count;
  }
  if (owner.edge_owner_to_timeline_media && owner.edge_owner_to_timeline_media.count) {
    response.user.postsCount = owner.edge_owner_to_timeline_media.count;
  }

  const postLocation = getLocation(location);
  if (postLocation) {
    response.location = postLocation;
  }

  return response;
}

async function getHTMLFromPost(permalink, source, cookies) {
  await waiter();

  const html = await extract(permalink, source, cookies);

  return html;
}

async function getUserAndLocationAndImage(post, cookies) {
  const source = 'instagram-post';

  const html = await getHTMLFromPost(post.permalink, source, cookies);

  if (html.includes('Page Not Found')) {
    debug('not_found');
    return null;
  }

  return transform(html);
}


module.exports = {
  getHTMLFromPost,
  getUserAndLocationAndImage,
};
