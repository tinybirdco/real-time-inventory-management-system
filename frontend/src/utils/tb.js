export async function sendEvents(events, dsName, dsAppendToken){
  const date = new Date();
  events.forEach(ev => {
      ev.timestamp = date.toISOString().slice(0, 19)
  });
  const headers = {
      'Authorization': `Bearer ${dsAppendToken}`,
  };
  const url = 'https://api.tinybird.co/' // you may be on a different host
  const rawResponse = await fetch(`${url}v0/events?name=${dsName}`, {
      method: 'POST',
      body: events.map(JSON.stringify).join('\n'),
      headers: headers,
  });
  const content = await rawResponse.json();
  console.log(content);
}