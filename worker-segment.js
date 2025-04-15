export default {
  async fetch(request) {
    const headers = request.headers

    const geoData = {
      country: headers.get('cf-ipcountry') || 'US',
      region: headers.get('cf-region') || 'Unknown',
      city: headers.get('cf-city') || 'Unknown',
      continent: headers.get('cf-continent') || 'Unknown',
    }

    // Simple geo-based variant logic
    let scriptUrl
    if (geoData.continent === 'AS') {
      scriptUrl = 'https://my-ab-variants.pages.dev/variant-a.js'
    } else {
      scriptUrl = 'https://my-ab-variants.pages.dev/variant-b.js'
    }

    const body = `
      console.log(${JSON.stringify(geoData)});
      const s = document.createElement('script');
      s.src = "${scriptUrl}";
      document.head.appendChild(s);
    `
    return new Response(body, {
      headers: { 'Content-Type': 'application/javascript' },
    })
  }
}
