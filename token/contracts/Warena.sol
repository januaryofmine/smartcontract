pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Warena is ERC721 {
    mapping(uint256 => string) private _tokenURIs;
    mapping(string => bool) private flagExisted;

    constructor(string memory _name, string memory _symbol)
        public
        ERC721(_name, _symbol)
    {}

    function _setTokenURI(uint256 _tokenId, string memory _tokenURI) internal {
        require(
            _exists(_tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        require(flagExisted[_tokenURI] == false, "Hash existed");

        _tokenURIs[_tokenId] = _tokenURI;
        flagExisted[_tokenURI] = true;
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(_tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        return _tokenURIs[_tokenId];
    }

    function mint(
        address _to,
        uint256 _tokenId,
        string memory _tokenURI
    ) public {
        super._mint(_to, _tokenId);
        _setTokenURI(_tokenId, _tokenURI);
    }
}
