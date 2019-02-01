// Generate timestamp based deploy path for banners
module.exports = (project) =>
{
  return () =>
  {
    const data  = project.meta;
    const date  = new Date;
    const path = [];
    const stamp = [date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()];

    // if either day or month is less than 10 put a zero infront
    if (stamp[1] < 10)
      stamp[1] = '0' + stamp[1];

    if (stamp[2] < 10)
      stamp[2] = '0' + stamp[2];

    path.push(data.client_or_agency);
    path.push(data.name);
    path.push(stamp.join(''));

    return path;
  };
};
