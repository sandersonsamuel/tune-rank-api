# 📡 TuneRank API Documentation

Documentação completa das chamadas de API e funcionalidades HTTP da aplicação.

---

## 🔐 Autenticação Spotify

| Função | Descrição |
|--------|-----------|
| `getSpotifyToken()` | Obtém token de acesso da API Spotify (Client Credentials Flow) |

**Arquivo:** `http/spotify/index.ts`

---

## 🎵 Endpoints Spotify

### Albums

| Função | Endpoint | Descrição |
|--------|----------|-----------|
| `getAlbum(id)` | `GET /v1/albums/{id}` | Busca um álbum por ID |
| `getAlbum(ids[])` | `GET /v1/albums?ids={ids}` | Busca múltiplos álbuns por IDs |

**Arquivo:** `http/spotify/albums.ts`

---

### Tracks

| Função | Endpoint | Descrição |
|--------|----------|-----------|
| `getTrack(id)` | `GET /v1/tracks/{id}` | Busca uma faixa por ID |
| `getTrack(ids[])` | `GET /v1/tracks?ids={ids}` | Busca múltiplas faixas por IDs |

**Arquivo:** `http/spotify/tracks.ts`

---

### Artists

| Função | Endpoint | Descrição |
|--------|----------|-----------|
| `getArtist(id)` | `GET /v1/artists/{id}` | Busca artista por ID |
| `getArtistTopTracks(id)` | `GET /v1/artists/{id}/top-tracks?country=BR` | Busca top tracks do artista |
| `getArtistAlbums(id)` | `GET /v1/artists/{id}/albums` | Busca álbuns do artista |

**Arquivo:** `http/spotify/artist.ts`

---

### Search

| Função | Endpoint | Descrição |
|--------|----------|-----------|
| `searchSpotify({ query })` | `GET /v1/search?q={query}&type=artist,album,track&limit=4` | Busca geral com melhor correspondência |

**Retorno:** Além dos resultados padrão, inclui `betterResult` com o item mais relevante baseado em similaridade de string.

**Arquivo:** `http/spotify/search.ts`

---

### Recommendations

| Função | Endpoint | Descrição |
|--------|----------|-----------|
| `getSpotifyRecommendations()` | `GET /v1/browse/categories` | Lista categorias de navegação |

**Arquivo:** `http/spotify/recomendations.ts`

---

## ❤️ Funcionalidades - Likes (Firebase)

### Track Likes

| Função | Operação | Descrição |
|--------|----------|-----------|
| `likeTrack({ trackId, userId })` | `SET` | Curte uma faixa |
| `unlikeTrack({ trackId, userId })` | `DELETE` | Remove curtida de uma faixa |
| `getLikeTrack(userId, trackId)` | `GET` | Verifica se usuário curtiu a faixa |
| `getLikedTracks(userId)` | `QUERY` | Lista todas as faixas curtidas do usuário |

### Album Likes

| Função | Operação | Descrição |
|--------|----------|-----------|
| `likeAlbum({ albumId, userId })` | `SET` | Curte um álbum |
| `unlikeAlbum({ albumId, userId })` | `DELETE` | Remove curtida de um álbum |
| `getLikeAlbum(userId, albumId)` | `GET` | Verifica se usuário curtiu o álbum |
| `getLikedAlbums(userId)` | `QUERY` | Lista todos os álbuns curtidos do usuário |

**Coleção Firestore:** `likes`  
**Arquivo:** `http/features/likes/services.ts`

---

## ⭐ Funcionalidades - Ratings (Firebase)

### Album Ratings

| Função | Operação | Descrição |
|--------|----------|-----------|
| `postRatingAlbum(rate, comment, albumId, user)` | `SET` | Salva avaliação de álbum |
| `getRatingAlbum(document_id)` | `GET` | Busca avaliação específica |
| `getAlbumRates(albumId)` | `QUERY` | Busca todas as avaliações do álbum com estatísticas |

**Arquivo:** `http/features/rating/album-services.ts`

### Track Ratings

| Função | Operação | Descrição |
|--------|----------|-----------|
| `postRatingTrack(rate, comment, trackId, user)` | `SET` | Salva avaliação de faixa |
| `getRatingTrack(document_id)` | `GET` | Busca avaliação específica |
| `getTrackRates(trackId)` | `QUERY` | Busca todas as avaliações da faixa com estatísticas |

**Arquivo:** `http/features/rating/track-services.ts`

### Release Services

| Função | Operação | Descrição |
|--------|----------|-----------|
| `getReleasesByUserId(userId)` | `QUERY` | Busca todas as avaliações do usuário (álbuns + faixas) |

**Retorno:** `{ albums: RateRelease[], tracks: RateRelease[] }` com dados do Spotify integrados.

**Arquivo:** `http/features/rating/release-services.ts`

**Coleção Firestore:** `ratings`

---

## 🪝 React Query Hooks

### Likes Hooks

| Hook | Query Key | Descrição |
|------|-----------|-----------|
| `useGetLikeTrack({ userId, trackId })` | `["like-track", userId, trackId]` | Status de like da faixa |
| `useGetLikedTracks({ userId })` | `["like-tracks", userId]` | Lista likes de faixas |
| `useGetLikeAlbum({ userId, albumId })` | `["like-album", userId, albumId]` | Status de like do álbum |
| `useGetLikedAlbums({ userId })` | `["like-albums", userId]` | Lista likes de álbuns |
| `useGetLikedAlbumsById(albumsId[])` | `["like-albums", albumsId]` | Dados dos álbuns curtidos |
| `useGetLikedTracksById(tracksId[])` | `["like-tracks", tracksId]` | Dados das faixas curtidas |

**Arquivo:** `http/features/likes/hooks.ts`

### Rating Hooks

| Hook | Query Key | Descrição |
|------|-----------|-----------|
| `useGetRatingTrack(trackId, userId)` | `["rating-track", trackId, userId]` | Avaliação do usuário para faixa |
| `useGetRatingAlbum(albumId, userId)` | `["rating-album", albumId, userId]` | Avaliação do usuário para álbum |
| `useTrackRates(trackId)` | `["track-rates", trackId]` | Estatísticas de avaliação da faixa |
| `useAlbumRates(albumId)` | `["album-rates", albumId]` | Estatísticas de avaliação do álbum |
| `useReleasesByUserId(userId)` | `["releases-by-user-id", userId]` | Todas as avaliações do usuário |

**Arquivo:** `http/features/rating/hooks.ts`

---

## 📂 Estrutura de Pastas

```
http/
├── spotify/
│   ├── index.ts         # Auth token
│   ├── albums.ts        # Álbuns
│   ├── tracks.ts        # Faixas
│   ├── artist.ts        # Artistas
│   ├── search.ts        # Busca
│   └── recomendations.ts # Categorias
└── features/
    ├── likes/
    │   ├── services.ts  # Operações Firebase
    │   └── hooks.ts     # React Query hooks
    └── rating/
        ├── album-services.ts   # Avaliações de álbuns
        ├── track-services.ts   # Avaliações de faixas
        ├── release-services.ts # Avaliações do usuário
        └── hooks.ts            # React Query hooks
```

---

## 🔗 Base URLs

| Serviço | URL |
|---------|-----|
| Spotify API (Auth) | `https://accounts.spotify.com/api/token` |
| Spotify API (Data) | `NEXT_PUBLIC_SPOTIFY_BASE_URL` (env var) |
| Firebase Firestore | Configurado via `firebase/config.ts` |
