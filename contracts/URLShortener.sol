// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract UrlShortener {
    struct ShortUrl {
    address owner; // owner of the short URL
    string shortCode; // Short code (e.g. "abc123")
    string longUrl;   // Long URL (e.g. "https://example.com/some/very/long/url")
  }

  // Maps a short code (e.g. "abc123") to a ShortUrl struct
  mapping(string => ShortUrl) private shortUrls;

  // event emitted when a new short URL is created
  event URLShortened(string indexed shortCode, string longUrl);

  /**
    * @notice Create a shortened URL by mapping a short code to a long URL.
    * @param shortCode The short code (unique identifier)
    * @param longUrl The long URL to map to
    */
  function setURL(string calldata shortCode, string calldata longUrl) external {
    require(bytes(shortCode).length > 0, "Short code cannot be empty");
    require(bytes(longUrl).length > 0, "Long URL cannot be empty");
    // In a production scenario, you'd probably want some uniqueness checks,
    // or handle collisions differently. For now we allow overwriting.

    // Check mapping for existing short code
    ShortUrl storage existingShortUrl = shortUrls[shortCode];
    // if exist return error, except is deleted
    require(existingShortUrl.owner == address(0) || bytes(existingShortUrl.longUrl).length == 0, "Short code already exists");
    // Create a new ShortUrl struct and store it in the mapping
    shortUrls[shortCode] = ShortUrl({
      owner: msg.sender,
      shortCode: shortCode,
      longUrl: longUrl
    });

    emit URLShortened(shortCode, longUrl);
  }

  /**
    * @notice Retrieve the long URL for a given short code.
    * @param shortCode The short code to look up
    * @return longUrl The long URL that the short code points to
    */
  function getURL(string calldata shortCode) external view returns (address, string memory) {
    ShortUrl storage shortUrl = shortUrls[shortCode];
    require(bytes(shortUrl.longUrl).length > 0, "Short code not found");
    return (shortUrl.owner, shortUrl.longUrl);
  }

  /**
    * @notice Delete a shortened URL by its short code in the mapping.
    * @param shortCode The short code to delete
    */
  function deleteURL(string calldata shortCode) external {
    ShortUrl storage shortUrl = shortUrls[shortCode];
    require(shortUrl.owner == msg.sender, "Only the owner can delete this URL");
    require(bytes(shortUrl.longUrl).length > 0, "Short code not found");
    delete shortUrls[shortCode];
  }
}